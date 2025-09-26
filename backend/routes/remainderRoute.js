import express from "express";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

import Appointment from "../models/appointmentModel.js";
import { sendEmail } from "../utils/mailer.js";
import { reminder20m } from "../utils/emailTemplates.js";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const router = express.Router();

router.post("/run-20m", async (req, res) => {
  try {
    // --- Security check ---
    const key = req.header("X-CRON-KEY");
    if (!key || key !== process.env.CRON_SECRET) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // --- Load all appointments that haven't been reminded yet ---
    const appts = await Appointment.find({ reminder20mSent: false });

    // Work in IST (since your slotDate/slotTime come from frontend in IST)
    const nowIST = dayjs().tz("Asia/Kolkata");
    const start = nowIST.add(19, "minute");
    const end = nowIST.add(21, "minute");

    const matching = [];

    for (const a of appts) {
      // slotDate is like "25_8_2025", slotTime is like "10:30 AM"
      // Replace underscores with dashes and parse
      const normalizedDate = a.slotDate.replace(/_/g, "-"); // "25-8-2025"
      const dateTimeStr = `${normalizedDate} ${a.slotTime}`;

      // Try parsing (dayjs lenient mode off = true)
      const m = dayjs.tz(dateTimeStr, "D-M-YYYY hh:mm A", "Asia/Kolkata", true);

      if (!m.isValid()) {
        console.warn("Could not parse appointment time:", a.slotDate, a.slotTime, a._id.toString());
        continue;
      }

      if (m.isAfter(start) && m.isBefore(end)) {
        matching.push({ appt: a, when: m });
      }
    }

    let sent = 0;

    for (const { appt: a, when } of matching) {
      const to = a?.userData?.email;
      if (!to) continue;

      // mark as sent first
      a.reminder20mSent = true;
      a.reminder20mSentAt = new Date();
      await a.save();

      try {
        await sendEmail({
          to,
          subject: "Reminder: Appointment in 20 minutes",
          html: reminder20m({
            patientName: a.userData?.name || "Patient",
            doctorName: a.docData?.name || "Doctor",
            date: when.format("DD MMM YYYY"),
            time: when.format("hh:mm A"),
          }),
        });
        sent++;
      } catch (err) {
        // revert flag if failed
        a.reminder20mSent = false;
        a.reminder20mSentAt = undefined;
        await a.save();
        console.error("Email send failed for appointment", a._id, err.message);
      }
    }

    res.json({ checked: appts.length, matching: matching.length, sent });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
