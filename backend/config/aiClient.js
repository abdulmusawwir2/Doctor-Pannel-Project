import { GoogleGenerativeAI } from "@google/generative-ai";

const FAQ = `
Clinic Assistant Rules:
- Be brief, friendly, and accurate.
- If it's an emergency: advise calling the clinic or local emergency number.
- If unsure, suggest contacting support.

FAQs you should handle clearly:
1) How to book an appointment?
   - App/Website → "Book Appointment" → select specialty/doctor → date → time → confirm.
2) Which doctors are available today?
   - If I give you a list in Context, use it. Otherwise answer generally.
3) How to cancel or reschedule?
   - "My Appointments" → select appointment → Cancel or Reschedule → pick a new time → confirm.
`;

export async function askGemini(userMessage, extraContext = "") {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
  });

  const prompt = `${FAQ}\n${extraContext ? `\nContext:\n${extraContext}\n` : ""}\nUser: ${userMessage}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}
