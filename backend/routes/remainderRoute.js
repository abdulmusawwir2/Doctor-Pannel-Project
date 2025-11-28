// import express from "express";
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc.js";
// import timezone from "dayjs/plugin/timezone.js";
// import customParseFormat from "dayjs/plugin/customParseFormat.js";

// import Appointment from "../models/appointmentModel.js";
// import { sendEmail } from "../utils/mailer.js";
// import { reminder20m } from "../utils/emailTemplates.js";

// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.extend(customParseFormat);

// const router = express.Router();

// router.post("/run-20m", async (req, res) => {
//   try {
//     // --- Security check ---
//     const key = req.header("X-CRON-KEY");
//     if (!key || key !== process.env.CRON_SECRET) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     // --- Load all appointments that haven't been reminded yet ---
//     const appts = await Appointment.find({ reminder20mSent: false });

//     // Work in IST (since your slotDate/slotTime come from frontend in IST)
//     // const nowIST = dayjs().tz("Asia/Kolkata");
//     // const start = nowIST.add(19, "minute");
//     // const end = nowIST.add(21, "minute");



//     const matching = [];

//     for (const a of appts) {
//       // slotDate is like "25_8_2025", slotTime is like "10:30 AM"
//       // Replace underscores with dashes and parse
//       const normalizedDate = a.slotDate.replace(/_/g, "-"); // "25-8-2025"
//       const dateTimeStr = `${normalizedDate} ${a.slotTime}`;

//       // Try parsing (dayjs lenient mode off = true)
//       const m = dayjs.tz(dateTimeStr, "D-M-YYYY hh:mm A", "Asia/Kolkata", true);

//       if (!m.isValid()) {
//         console.warn("Could not parse appointment time:", a.slotDate, a.slotTime, a._id.toString());
//         continue;
//       }

//       if (m.isAfter(start) && m.isBefore(end)) {
//         matching.push({ appt: a, when: m });
//       }
//     }

//     let sent = 0;

//     for (const { appt: a, when } of matching) {
//       const to = a?.userData?.email;
//       if (!to) continue;

//       // mark as sent first
//       a.reminder20mSent = true;
//       a.reminder20mSentAt = new Date();
//       await a.save();

//       try {
//         await sendEmail({
//           to,
//           subject: "Reminder: Appointment in 20 minutes",
//           html: reminder20m({
//             patientName: a.userData?.name || "Patient",
//             doctorName: a.docData?.name || "Doctor",
//             date: when.format("DD MMM YYYY"),
//             time: when.format("hh:mm A"),
//           }),
//         });
//         sent++;
//       } catch (err) {
//         // revert flag if failed
//         a.reminder20mSent = false;
//         a.reminder20mSentAt = undefined;
//         await a.save();
//         console.error("Email send failed for appointment", a._id, err.message);
//       }
//     }

//     res.json({ checked: appts.length, matching: matching.length, sent });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// export default router;





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
    console.log("===================================");
    console.log("[CRON 20m] Hit at:", new Date().toISOString());

    // --- Security check ---
    const key = req.header("X-CRON-KEY");
    console.log("[CRON 20m] Received X-CRON-KEY:", key);

    if (!key || key !== process.env.CRON_SECRET) {
      console.log(
        "[CRON 20m] Unauthorized. Expected CRON_SECRET, got:",
        key
      );
      return res.status(401).json({ error: "Unauthorized" });
    }

    // --- Load all appointments that haven't been reminded yet ---
    const appts = await Appointment.find({ reminder20mSent: false });
    console.log(
      `[CRON 20m] Loaded ${appts.length} appointments with reminder20mSent = false`
    );

    // Work in IST (since your slotDate/slotTime come from frontend in IST)

    // const nowIST = dayjs().tz("Asia/Kolkata");
    // const start = nowIST.add(19, "minute");
    // const end = nowIST.add(21, "minute");

    const nowIST = dayjs().tz("Asia/Kolkata");
    const start = nowIST; // now
    const end = nowIST.add(60, "minute"); // now + 30 min

    console.log("[CRON 20m] Time window (IST):");
    console.log("  nowIST :", nowIST.format("DD-MM-YYYY HH:mm:ss"));
    console.log("  start  :", start.format("DD-MM-YYYY HH:mm:ss"));
    console.log("  end    :", end.format("DD-MM-YYYY HH:mm:ss"));

    const matching = [];

    for (const a of appts) {
      try {
        console.log("-----------------------------------");
        console.log("[CRON 20m] Checking appointment:", a._id.toString());
        console.log("  raw slotDate:", a.slotDate);
        console.log("  raw slotTime:", a.slotTime);

        // slotDate is like "25_8_2025", slotTime is like "10:30 AM"
        // Replace underscores with dashes and parse
        const normalizedDate = a.slotDate.replace(/_/g, "-"); // "25-8-2025"
        const dateTimeStr = `${normalizedDate} ${a.slotTime}`;
        console.log("  normalizedDate:", normalizedDate);
        console.log("  dateTimeStr   :", dateTimeStr);

        // Try parsing (strict mode = true)
        const m = dayjs.tz(
          dateTimeStr,
          "D-M-YYYY hh:mm A",
          "Asia/Kolkata",
          true
        );

        if (!m.isValid()) {
          console.warn(
            "[CRON 20m] Could not parse appointment time:",
            a.slotDate,
            a.slotTime,
            "for _id:",
            a._id.toString()
          );
          continue;
        }

        console.log("  parsed m (IST):", m.format("DD-MM-YYYY HH:mm:ss"));

        if (m.isAfter(start) && m.isBefore(end)) {
          console.log("  ✅ Appointment is within window. Will send email.");
          matching.push({ appt: a, when: m });
        } else {
          console.log("  ❌ Not in window. Skipping this appointment.");
        }
      } catch (innerErr) {
        console.error(
          "[CRON 20m] Error while processing appointment",
          a._id.toString(),
          innerErr
        );
      }
    }

    console.log(
      `[CRON 20m] Total matching appointments in window: ${matching.length}`
    );

    let sent = 0;

    for (const { appt: a, when } of matching) {
      const to = a?.userData?.email;
      console.log("-----------------------------------");
      console.log("[CRON 20m] Preparing to send mail for appointment:", a._id);
      console.log("  email:", to);

      if (!to) {
        console.log("  ❌ No email found (userData.email). Skipping.");
        continue;
      }

      // mark as sent first
      a.reminder20mSent = true;
      a.reminder20mSentAt = new Date();
      await a.save();
      console.log("  Flag reminder20mSent set to true and saved.");

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

        console.log("  ✅ Email sent successfully to:", to);
        sent++;
      } catch (err) {
        console.error(
          "  ❌ Email send failed for appointment",
          a._id.toString(),
          "Error:",
          err.message
        );

        // revert flag if failed
        a.reminder20mSent = false;
        a.reminder20mSentAt = undefined;
        await a.save();
        console.log("  Reverted reminder20mSent flag due to error.");
      }
    }

    console.log(
      `[CRON 20m] Done. Checked: ${appts.length}, Matching: ${matching.length}, Sent: ${sent}`
    );

    res.json({ checked: appts.length, matching: matching.length, sent });
  } catch (e) {
    console.error("[CRON 20m] Server error:", e);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
