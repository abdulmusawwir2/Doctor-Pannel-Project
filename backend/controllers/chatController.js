// import { askGemini } from "../config/aiClient.js";
// import Doctor from "../models/doctorModel.js";

// // 10:00 AM – 08:30 PM every 30 min
// const WORKING_SLOTS = [
//   "10:00 AM","10:30 AM","11:00 AM","11:30 AM",
//   "12:00 PM","12:30 PM","01:00 PM","01:30 PM",
//   "02:00 PM","02:30 PM","03:00 PM","03:30 PM",
//   "04:00 PM","04:30 PM","05:00 PM","05:30 PM",
//   "06:00 PM","06:30 PM","07:00 PM","07:30 PM","08:00 PM","08:30 PM"
// ];

// // Specialty list (normalize to exactly how you store them)
// const SPECIALTIES = [
//   "General Physician",
//   "Gynecologist",
//   "Dermatologist",
//   "Pediatricians",     // if you store "Pediatricians" (plural) keep it; else change to "Pediatrician"
//   "Neurologist",
//   "Gastroenterologist"
// ];

// // Simple symptom → specialty mapping
// const SYMPTOM_TO_SPECIALTY = [
//   { test: /fever|high temperature|chills/i, specialty: "General Physician" },
//   { test: /\bskin rash|acne|itch|eczema|psoriasis/i, specialty: "Dermatologist" },
//   { test: /\bheadache|migraine|seizure|numbness|tingling/i, specialty: "Neurologist" },
//   { test: /\bstomach|abdomen|gastric|acidity|ulcer|liver|gut|ibs|constipation|diarrhea/i, specialty: "Gastroenterologist" },
//   { test: /\bpregnan|period|gyne|gyn|obg|ob-gyn|pcos|pelvic/i, specialty: "Gynecologist" },
//   // kid/child + fever/cough etc → pediatric
//   { test: /(child|kid|baby|infant).*(fever|cold|cough|vomit|diarrhea|rash)/i, specialty: "Pediatricians" },
// ];

// function dateKeyDMY(d = new Date()) {
//   return `${d.getDate()}_${d.getMonth() + 1}_${d.getFullYear()}`;
// }

// function pickSpecialtyFromSymptoms(msg) {
//   for (const rule of SYMPTOM_TO_SPECIALTY) {
//     if (rule.test.test(msg)) return rule.specialty;
//   }
//   return null;
// }

// // nice bullet formatting (limit slots to keep readable)
// function formatDoctorLines(rows, dateKey) {
//   if (!rows.length) return `No matching doctors have free slots on ${dateKey}.`;
//   const bullets = rows.map(r => {
//     const slots = r.freeSlots.slice(0, 8).join(", "); // show first 8 to keep it neat
//     return `• ${r.name} (${r.speciality})\n  Free slots: ${slots || "—"}`;
//   }).join("\n");
//   return `**Doctors available on ${dateKey}:**\n${bullets}`;
// }

// async function getFreeSlotsForDocs(docs, dateKey) {
//   const out = [];
//   for (const d of docs) {
//     const booked = (d.slots_booked && d.slots_booked[dateKey]) || [];
//     const bookedSet = new Set(booked.map(s => s.trim()));
//     const free = WORKING_SLOTS.filter(t => !bookedSet.has(t));
//     if (free.length) out.push({ name: d.name, speciality: d.speciality, freeSlots: free });
//   }
//   return out;
// }

// export const chat = async (req, res) => {
//   try {
//     const { message } = req.body || {};
//     if (!message) return res.status(400).json({ error: "message is required" });

//     const q = message.toLowerCase();
//     const todayKey = dateKeyDMY();

//     // 1) Symptom triage → pick specialty (e.g., "fever" → General Physician)
//     const chosenSpecialty = pickSpecialtyFromSymptoms(message);
//     if (chosenSpecialty && SPECIALTIES.includes(chosenSpecialty)) {
//       const docs = await Doctor.find({ available: true, speciality: chosenSpecialty })
//         .select("name speciality slots_booked")
//         .lean();

//       const rows = await getFreeSlotsForDocs(docs, todayKey);
//       const reply = rows.length
//         ? formatDoctorLines(rows, todayKey)
//         : `No ${chosenSpecialty}s have free slots on ${todayKey}. You can try another time or date.`;

//       return res.json({ reply });
//     }

//     // 2) General: "Which doctors are available today?"
//     if (q.includes("available") && q.includes("doctor") && (q.includes("today") || q.includes("now"))) {
//       const docs = await Doctor.find({ available: true })
//         .select("name speciality slots_booked")
//         .lean();

//       if (!docs.length) {
//         return res.json({ reply: `No doctors are available for ${todayKey}.` });
//       }
//       const rows = await getFreeSlotsForDocs(docs, todayKey);
//       const reply = rows.length
//         ? formatDoctorLines(rows, todayKey)
//         : `Doctors are available but no free slots left on ${todayKey}.`;
//       return res.json({ reply });
//     }

//     // 3) Fallback to Gemini for booking/cancel/reschedule FAQs
//     const reply = await askGemini(message, "");
//     return res.json({ reply: reply || "Sorry, I couldn't reply." });

//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({ error: "Failed to generate reply" });
//   }
// };



// // Symptom → specialty mapping (fever → General Physician, rash → Dermatologist, etc.)

// // General availability (“Which doctors are available today?”, “Available doctors now”)

// // Specific doctor check (“Is Dr. Abdul Musawwir available today?”)

// // Fallback to Gemini for everything else (booking, cancel, reschedule, FAQs).

// // 🔹 1. Doctor Availability

// // Trigger when user message includes doctor/Dr + available/availability/free + today/now
// // Examples users may type:

// // “Which doctors are available today?”

// // “Available doctors today”

// // “Doctors available now”

// // “Who is free today?”

// // “Doctor availability for today”

// // “List doctors available now”

// // 🔹 2. Specific Doctor Availability

// // Trigger when message has doctor name + time/date
// // Examples:

// // “Is Dr. Emily available today?”

// // “Is Dr. Emily available at 10:30 AM?”

// // “Check Dr. Emily Larson availability tomorrow”

// // “Does Dr. Patel have free slots today?”

// // “Show Dr. Christopher’s timings for 28/09/2025”

// // 🔹 3. Appointment Booking

// // Trigger when message contains book/appointment/schedule/reserve
// // Examples:

// // “How to book an appointment?”

// // “Book appointment with Dr. Emily at 11:00 AM”

// // “I want to schedule an appointment with a doctor”

// // “Book Dr. Patel tomorrow at 2 pm”

// // “Reserve a slot with neurologist”

// // 🔹 4. Cancel / Reschedule

// // Trigger when message has cancel/reschedule/change
// // Examples:

// // “How to cancel an appointment?”

// // “Cancel my appointment with Dr. Emily today”

// // “I want to reschedule my appointment”

// // “Change my booking tomorrow to 5 pm”

// // “Reschedule my 2:30 slot with Dr. Patel”

// // 🔹 5. Symptom → Specialty Guidance

// // Trigger when message has symptom keywords (fever, skin rash, stomach pain, headache, pregnancy, child fever, etc.)
// // Examples:

// // “I am having fever which doctor to consult?” → General Physician

// // “My child has fever, who should I consult?” → Pediatrician

// // “I have skin rash” → Dermatologist

// // “I have frequent headaches” → Neurologist

// // “I have stomach pain / acidity” → Gastroenterologist

// // “I missed my period / pregnancy checkup” → Gynecologist

// // 🔹 6. General FAQs

// // Handled by Gemini fallback:

// // “What are your consultation fees?”

// // “Where is the clinic located?”

// // “Clinic opening hours?”

// // “Do you accept insurance?”

// // “What documents should I bring?”

import { askGemini } from "../config/aiClient.js";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";

// 10:00 AM – 08:30 PM every 30 min
const WORKING_SLOTS = [
  "10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","01:00 PM","01:30 PM",
  "02:00 PM","02:30 PM","03:00 PM","03:30 PM",
  "04:00 PM","04:30 PM","05:00 PM","05:30 PM",
  "06:00 PM","06:30 PM","07:00 PM","07:30 PM","08:00 PM","08:30 PM"
];

// Keep exactly as stored in DB
const SPECIALTIES = [
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians", // change if your DB uses "Pediatrician"
  "Neurologist",
  "Gastroenterologist"
];

// ---- Symptom → specialty rules
const SYMPTOM_TO_SPECIALTY = [
  { test: /fever|high temperature|chills/i, specialty: "General Physician" },
  { test: /\bskin (?:rash|issues?)|acne|itch|eczema|psoriasis/i, specialty: "Dermatologist" },
  { test: /\b(headache|migraine|seizure|numbness|tingling)\b/i, specialty: "Neurologist" },
  { test: /\b(stomach|abdomen|gastric|acidity|ulcer|liver|gut|ibs|constipation|diarrhea)\b/i, specialty: "Gastroenterologist" },
  { test: /\b(pregnan|period|gyne|gyn|obg|ob-gyn|pcos|pelvic)\b/i, specialty: "Gynecologist" },
  { test: /(child|kid|baby|infant).*(fever|cold|cough|vomit|diarrhea|rash)/i, specialty: "Pediatricians" },
];

// ---------- Helpers ----------
function dateKeyDMY(d = new Date()) {
  return `${d.getDate()}_${d.getMonth() + 1}_${d.getFullYear()}`;
}

function parseDateFromMessage(msg) {
  const q = msg.toLowerCase();
  const now = new Date();

  if (/\btoday\b/.test(q)) return { date: now, key: dateKeyDMY(now) };

  if (/\btomorrow\b/.test(q)) {
    const d = new Date(now);
    d.setDate(d.getDate() + 1);
    return { date: d, key: dateKeyDMY(d) };
  }

  const m = q.match(/\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\b/);
  if (m) {
    const [ , dd, mm, yyyy ] = m;
    const d = new Date(Number(yyyy), Number(mm)-1, Number(dd));
    if (!isNaN(d.getTime())) return { date: d, key: dateKeyDMY(d) };
  }

  // default: today
  return { date: now, key: dateKeyDMY(now) };
}

// normalize hour/min + am/pm to a WORKING_SLOTS string
function hhmmToSlot(hh, mm, ampm) {
  let H = Number(hh);
  const M = String(mm).padStart(2,"0");
  let A = ampm?.toUpperCase();
  if (!A) A = H >= 12 ? "PM" : "AM";
  // 24h to 12h if needed
  if (H > 12) { A = "PM"; H = H - 12; }
  if (H === 0) { H = 12; A = "AM"; }
  const H12 = String(H).padStart(2,"0");
  const slot = `${H12}:${M} ${A}`;
  return WORKING_SLOTS.includes(slot) ? slot : null;
}

// ultra-tolerant time extraction: "2pm", "2 pm", "2:00 pm", "14:00", "5.30 pm", "05 30 pm"
function extractTime(msg) {
  const s = msg.trim();

  // 1) 24h with separators: 14:00 / 14.00 / 14 00
  let m = s.match(/\b([01]?\d|2[0-3])[:.\s]([0-5]\d)\b/);
  if (m) {
    return hhmmToSlot(m[1], m[2], null);
  }

  // 2) 12h with minutes and am/pm (allow space/no-space, colon/dot/space)
  m = s.match(/\b(1[0-2]|0?[1-9])[:.\s]?([0-5]\d)?\s?(am|pm)\b/i);
  if (m) {
    const hh = m[1];
    const mm = m[2] ?? "00";
    const ap = m[3];
    return hhmmToSlot(hh, mm, ap);
  }

  // 3) bare hour (12h) without minutes but with am/pm: "2pm"
  m = s.match(/\b(1[0-2]|0?[1-9])\s?(am|pm)\b/i);
  if (m) {
    return hhmmToSlot(m[1], "00", m[2]);
  }

  return null;
}

// Doctor name extractor that stops before common trailing words
function extractDoctorName(msg) {
  const stopWords = '(?:available|availability|at|on|for|in|today|tomorrow|now|slot|free|book|appointment|schedule|reserve|cancel|reschedule|to|by|around)';
  const re = new RegExp(
    `\\b(?:Dr\\.?|Doctor)\\s+([A-Za-z]+(?:\\s+[A-Za-z]+){0,2}?)(?=\\s+${stopWords}\\b|[,.!?]|$)`,
    'i'
  );
  const m = msg.match(re);
  if (!m) return null;
  return m[1].trim();
}

function pickSpecialtyFromSymptoms(msg) {
  for (const rule of SYMPTOM_TO_SPECIALTY) {
    if (rule.test.test(msg)) return rule.specialty;
  }
  return null;
}

function formatDoctorLines(rows, dateKey) {
  if (!rows.length) return `No matching doctors have free slots on ${dateKey}.`;
  const bullets = rows.map(r => {
    const slots = r.freeSlots.slice(0, 8).join(", ");
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

async function findDoctorByNameLike(name) {
  return Doctor.findOne({ name: { $regex: name, $options: "i" }, available: true })
    .select("name email speciality slots_booked fees address image") // ← include image
    .lean();
}


async function tryBookSlot({ userId, userData, doctorId, docData, dateKey, time, amount }) {
  const setKey = `slots_booked.${dateKey}`;
  const doc = await Doctor.findOneAndUpdate(
    { _id: doctorId },
    { $addToSet: { [setKey]: time } },
    { new: true }
  );
  const after = (doc?.slots_booked?.[dateKey]) || [];
  if (!doc || !after.includes(time)) {
    return { ok: false, reason: "That slot was just taken. Please choose another time." };
  }
  const appt = await Appointment.create({
    userId,
    docId: String(doctorId),
    slotDate: dateKey,
    slotTime: time,
    userData,
    docData,
    amount: Number(amount) || 0,
    date: Date.now(),
    cancelled: false,
    payment: false,
    isCompleted: false
  });
  return { ok: true, appointment: appt };
}

async function freeSlot({ doctorId, dateKey, time }) {
  const setKey = `slots_booked.${dateKey}`;
  await Doctor.updateOne({ _id: doctorId }, { $pull: { [setKey]: time } });
}

// ---------- MAIN ----------
export const chat = async (req, res) => {
  try {
    const { message, userId, userData, context } = req.body || {};
    // context is optional and can come from the UI (doctor page):
    // { currentDoctorId, currentDoctorName, currentSpeciality }
    if (!message) return res.status(400).json({ error: "message is required" });

    // ✅ derive effective user info (non-breaking)
    const effectiveUserId   = userId || null;
    const effectiveUserData = userData || { name: "User", email: "" };

    const q = message.toLowerCase();
    const { key: todayKey } = parseDateFromMessage("today");

    // 0) Symptom triage
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

    // Extract parsed tokens (used across intents)
    const askedTime = extractTime(message);                 // null if none
    const askedName = extractDoctorName(message);           // null if none
    const { key: askedDateKey } = parseDateFromMessage(message);

    // 1) Specific doctor availability
    if ((/available|availability|free|slot/i.test(message)) && /\bdr\.?|doctor\b/i.test(message)) {
      const doctor =
        (askedName && await findDoctorByNameLike(askedName)) ||
        (context?.currentDoctorId && await Doctor.findOne({ _id: context.currentDoctorId, available: true })
  .select("name email speciality slots_booked fees address image")   // added image
  .lean())


      if (!doctor) {
        return res.json({ reply: `I couldn't find an available doctor matching "${askedName || ""}".` });
      }
      const booked = (doctor.slots_booked && doctor.slots_booked[askedDateKey]) || [];
      const bookedSet = new Set(booked);

      if (askedTime) {
        const isFree = WORKING_SLOTS.includes(askedTime) && !bookedSet.has(askedTime);
        return res.json({
          reply: isFree
            ? `${doctor.name} is free at ${askedTime} on ${askedDateKey}. Say "Book ${askedTime} with ${doctor.name}" to confirm.`
            : `${doctor.name} is not free at ${askedTime} on ${askedDateKey}.`
        });
      } else {
        const free = WORKING_SLOTS.filter(t => !bookedSet.has(t));
        const first8 = free.slice(0, 8).join(", ") || "—";
        return res.json({ reply: `Free slots for ${doctor.name} on ${askedDateKey}: ${first8}` });
      }
    }

    // 2) General availability
    if (q.includes("available") && q.includes("doctor") && (q.includes("today") || q.includes("now"))) {
      const docs = await Doctor.find({ available: true })
        .select("name speciality slots_booked")
        .lean();
      if (!docs.length) return res.json({ reply: `No doctors are available for ${todayKey}.` });

      const rows = await getFreeSlotsForDocs(docs, todayKey);
      const reply = rows.length
        ? formatDoctorLines(rows, todayKey)
        : `Doctors are available but no free slots left on ${todayKey}.`;
      return res.json({ reply });
    }

    // 3) BOOK (accepts: "Book Dr. X at 2 pm", "Book at 5:30", "Book Neurologist 11:00", "5:30 pm" on doctor page)
    if (/\b(book|schedule|reserve|appointment)\b/i.test(message) || (askedTime && !/cancel|resched/i.test(message))) {
      // Try resolve doctor from: name → context.currentDoctor* → specialty
      let doctor =
        (askedName && await findDoctorByNameLike(askedName)) ||
        (context?.currentDoctorId && await Doctor.findOne({ _id: context.currentDoctorId, available: true })
          .select("name email speciality slots_booked fees address")
          .lean()) ||
        null;

      // If still no doctor and user gave a specialty in text, pick first available for that specialty
      if (!doctor) {
        for (const sp of SPECIALTIES) {
          if (new RegExp(`\\b${sp}\\b`, "i").test(message) || (context?.currentSpeciality && sp === context.currentSpeciality)) {
            const d = await Doctor.findOne({ available: true, speciality: sp })
  .select("name email speciality slots_booked fees address image")   // added address + image
  .lean();

            if (d) doctor = d;
            break;
          }
        }
      }

      // Need a time
      if (!askedTime) {
        return res.json({
          reply: `Please specify a valid time. Available slots include: ${WORKING_SLOTS.join(", ")}.`
        });
      }

      // Need a doctor
      if (!doctor) {
        return res.json({
          reply: `Please specify a doctor or specialty and a valid time (e.g., "Book Dr. Emily at 11:00 AM today").`
        });
      }

      const dateKey = askedDateKey;
      const booked = (doctor.slots_booked && doctor.slots_booked[dateKey]) || [];
      if (booked.includes(askedTime)) {
        return res.json({ reply: `That time is already booked for ${doctor.name} on ${dateKey}.` });
      }

      if (!effectiveUserId) {
        return res.json({ reply: `To complete booking, please log in and try again.` });
      }

      const result = await tryBookSlot({
        userId: effectiveUserId,
        userData: effectiveUserData,
        doctorId: doctor._id,
        // ✅ include address & fees in docData for UI (MyAppointments)
        docData: {
          name: doctor.name,
          speciality: doctor.speciality,
          email: doctor.email,
          address: doctor.address,
          fees: doctor.fees,
          image: doctor.image,
        },
        dateKey,
        time: askedTime,
        amount: Number(doctor.fees) || 0
      });

      if (!result.ok) return res.json({ reply: result.reason });
      return res.json({ reply: `✅ Booked ${doctor.name} on ${dateKey} at ${askedTime}. Appointment ID: ${result.appointment._id}.` });
    }

    // 4) CANCEL
    if (/\b(cancel|delete)\b.*\b(appointment|booking)\b/i.test(message)) {
      if (!effectiveUserId) return res.json({ reply: `Please log in so I can find your appointment.` });
      const time = askedTime;
      const dateKey = askedDateKey;

      // Try to resolve doctor (name or page context)
      const docFromName = askedName ? await findDoctorByNameLike(askedName) : null;
      const docId = (docFromName?._id) || context?.currentDoctorId || null;

      const qf = { userId: effectiveUserId, cancelled: false };
      if (docId) qf.docId = String(docId);
      if (time) qf.slotTime = time;
      if (dateKey) qf.slotDate = dateKey;

      const appt = await Appointment.findOneAndUpdate(qf, { $set: { cancelled: true } }, { new: true });
      if (!appt) return res.json({ reply: `I couldn't find an active appointment to cancel with those details.` });

      await freeSlot({ doctorId: appt.docId, dateKey: appt.slotDate, time: appt.slotTime });
      return res.json({ reply: `✅ Cancelled your appointment (${appt._id}) on ${appt.slotDate} at ${appt.slotTime}.` });
    }

    // 5) RESCHEDULE
    if (/\b(reschedule|change|move)\b.*\b(appointment|booking)\b/i.test(message)) {
      if (!effectiveUserId) return res.json({ reply: `Please log in so I can find your appointment.` });

      const newTime = askedTime;
      const { key: maybeNewDateKey } = parseDateFromMessage(message);

      const appt = await Appointment.findOne({ userId: effectiveUserId, cancelled: false, isCompleted: false }).sort({ date: -1 });
      if (!appt) return res.json({ reply: `No active appointment found to reschedule.` });

      const doc = await Doctor.findById(appt.docId).lean();
      if (!doc) return res.json({ reply: `Doctor not found for your appointment.` });

      const targetDateKey = maybeNewDateKey || appt.slotDate;
      const targetTime = newTime || appt.slotTime;

      const booked = (doc.slots_booked && doc.slots_booked[targetDateKey]) || [];
      if (booked.includes(targetTime)) {
        return res.json({ reply: `That new slot (${targetDateKey} at ${targetTime}) is already booked.` });
      }

      await freeSlot({ doctorId: appt.docId, dateKey: appt.slotDate, time: appt.slotTime });
      const setKey = `slots_booked.${targetDateKey}`;
      await Doctor.updateOne({ _id: appt.docId }, { $addToSet: { [setKey]: targetTime } });

      appt.slotDate = targetDateKey;
      appt.slotTime = targetTime;
      await appt.save();

      return res.json({ reply: `✅ Rescheduled to ${targetDateKey} at ${targetTime}. Appointment ID: ${appt._id}.` });
    }

    // 6) FAQs → Gemini
    if (/\b(fee|fees|cost|price|address|location|hours|timings|insurance|documents?)\b/i.test(message)) {
      const reply = await askGemini(message, "");
      return res.json({ reply: reply || "Sorry, I couldn't reply." });
    }

    // 7) Fallback
    const reply = await askGemini(message, "");
    return res.json({ reply: reply || "Sorry, I couldn't reply." });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to generate reply" });
  }
};
