import { askGemini } from "../config/aiClient.js";
import Doctor from "../models/doctorModel.js";

// 10:00 AM – 08:30 PM every 30 min
const WORKING_SLOTS = [
  "10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","01:00 PM","01:30 PM",
  "02:00 PM","02:30 PM","03:00 PM","03:30 PM",
  "04:00 PM","04:30 PM","05:00 PM","05:30 PM",
  "06:00 PM","06:30 PM","07:00 PM","07:30 PM","08:00 PM","08:30 PM"
];

// Specialty list (normalize to exactly how you store them)
const SPECIALTIES = [
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",     // if you store "Pediatricians" (plural) keep it; else change to "Pediatrician"
  "Neurologist",
  "Gastroenterologist"
];

// Simple symptom → specialty mapping
const SYMPTOM_TO_SPECIALTY = [
  { test: /fever|high temperature|chills/i, specialty: "General Physician" },
  { test: /\bskin rash|acne|itch|eczema|psoriasis/i, specialty: "Dermatologist" },
  { test: /\bheadache|migraine|seizure|numbness|tingling/i, specialty: "Neurologist" },
  { test: /\bstomach|abdomen|gastric|acidity|ulcer|liver|gut|ibs|constipation|diarrhea/i, specialty: "Gastroenterologist" },
  { test: /\bpregnan|period|gyne|gyn|obg|ob-gyn|pcos|pelvic/i, specialty: "Gynecologist" },
  // kid/child + fever/cough etc → pediatric
  { test: /(child|kid|baby|infant).*(fever|cold|cough|vomit|diarrhea|rash)/i, specialty: "Pediatricians" },
];

function dateKeyDMY(d = new Date()) {
  return `${d.getDate()}_${d.getMonth() + 1}_${d.getFullYear()}`;
}

function pickSpecialtyFromSymptoms(msg) {
  for (const rule of SYMPTOM_TO_SPECIALTY) {
    if (rule.test.test(msg)) return rule.specialty;
  }
  return null;
}

// nice bullet formatting (limit slots to keep readable)
function formatDoctorLines(rows, dateKey) {
  if (!rows.length) return `No matching doctors have free slots on ${dateKey}.`;
  const bullets = rows.map(r => {
    const slots = r.freeSlots.slice(0, 8).join(", "); // show first 8 to keep it neat
    return `• ${r.name} (${r.speciality})\n  Free slots: ${slots || "—"}`;
  }).join("\n");
  return `**Doctors available on ${dateKey}:**\n${bullets}`;
}

async function getFreeSlotsForDocs(docs, dateKey) {
  const out = [];
  for (const d of docs) {
    const booked = (d.slots_booked && d.slots_booked[dateKey]) || [];
    const bookedSet = new Set(booked.map(s => s.trim()));
    const free = WORKING_SLOTS.filter(t => !bookedSet.has(t));
    if (free.length) out.push({ name: d.name, speciality: d.speciality, freeSlots: free });
  }
  return out;
}

export const chat = async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: "message is required" });

    const q = message.toLowerCase();
    const todayKey = dateKeyDMY();

    // 1) Symptom triage → pick specialty (e.g., "fever" → General Physician)
    const chosenSpecialty = pickSpecialtyFromSymptoms(message);
    if (chosenSpecialty && SPECIALTIES.includes(chosenSpecialty)) {
      const docs = await Doctor.find({ available: true, speciality: chosenSpecialty })
        .select("name speciality slots_booked")
        .lean();

      const rows = await getFreeSlotsForDocs(docs, todayKey);
      const reply = rows.length
        ? formatDoctorLines(rows, todayKey)
        : `No ${chosenSpecialty}s have free slots on ${todayKey}. You can try another time or date.`;

      return res.json({ reply });
    }

    // 2) General: "Which doctors are available today?"
    if (q.includes("available") && q.includes("doctor") && (q.includes("today") || q.includes("now"))) {
      const docs = await Doctor.find({ available: true })
        .select("name speciality slots_booked")
        .lean();

      if (!docs.length) {
        return res.json({ reply: `No doctors are available for ${todayKey}.` });
      }
      const rows = await getFreeSlotsForDocs(docs, todayKey);
      const reply = rows.length
        ? formatDoctorLines(rows, todayKey)
        : `Doctors are available but no free slots left on ${todayKey}.`;
      return res.json({ reply });
    }

    // 3) Fallback to Gemini for booking/cancel/reschedule FAQs
    const reply = await askGemini(message, "");
    return res.json({ reply: reply || "Sorry, I couldn't reply." });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to generate reply" });
  }
};



// Symptom → specialty mapping (fever → General Physician, rash → Dermatologist, etc.)

// General availability (“Which doctors are available today?”, “Available doctors now”)

// Specific doctor check (“Is Dr. Abdul Musawwir available today?”)

// Fallback to Gemini for everything else (booking, cancel, reschedule, FAQs).

// 🔹 1. Doctor Availability

// Trigger when user message includes doctor/Dr + available/availability/free + today/now
// Examples users may type:

// “Which doctors are available today?”

// “Available doctors today”

// “Doctors available now”

// “Who is free today?”

// “Doctor availability for today”

// “List doctors available now”

// 🔹 2. Specific Doctor Availability

// Trigger when message has doctor name + time/date
// Examples:

// “Is Dr. Emily available today?”

// “Is Dr. Emily available at 10:30 AM?”

// “Check Dr. Emily Larson availability tomorrow”

// “Does Dr. Patel have free slots today?”

// “Show Dr. Christopher’s timings for 28/09/2025”

// 🔹 3. Appointment Booking

// Trigger when message contains book/appointment/schedule/reserve
// Examples:

// “How to book an appointment?”

// “Book appointment with Dr. Emily at 11:00 AM”

// “I want to schedule an appointment with a doctor”

// “Book Dr. Patel tomorrow at 2 pm”

// “Reserve a slot with neurologist”

// 🔹 4. Cancel / Reschedule

// Trigger when message has cancel/reschedule/change
// Examples:

// “How to cancel an appointment?”

// “Cancel my appointment with Dr. Emily today”

// “I want to reschedule my appointment”

// “Change my booking tomorrow to 5 pm”

// “Reschedule my 2:30 slot with Dr. Patel”

// 🔹 5. Symptom → Specialty Guidance

// Trigger when message has symptom keywords (fever, skin rash, stomach pain, headache, pregnancy, child fever, etc.)
// Examples:

// “I am having fever which doctor to consult?” → General Physician

// “My child has fever, who should I consult?” → Pediatrician

// “I have skin rash” → Dermatologist

// “I have frequent headaches” → Neurologist

// “I have stomach pain / acidity” → Gastroenterologist

// “I missed my period / pregnancy checkup” → Gynecologist

// 🔹 6. General FAQs

// Handled by Gemini fallback:

// “What are your consultation fees?”

// “Where is the clinic located?”

// “Clinic opening hours?”

// “Do you accept insurance?”

// “What documents should I bring?”