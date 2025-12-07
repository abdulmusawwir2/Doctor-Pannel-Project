// import cron from "node-cron";
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// cron.schedule("* * * * *", async () => {
//   try {
//     await axios.post(
//       process.env.CRON_URL,
//       {},
//       { headers: { "X-CRON-KEY": process.env.CRON_SECRET } }
//     );

//     console.log("Cron ran every minute");
//   } catch (error) {
//     console.error("Cron failed:", error.message);
//   }
// });




// routes/cron.js (or wherever you placed it)
import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 4000;

// build default URL to self
const defaultCronUrl = `http://localhost:${port}/api/reminders/run-20m`;

cron.schedule("* * * * *", async () => {
  try {
    const url = process.env.CRON_URL || defaultCronUrl;

    console.log("[CRON] Calling:", url, "at", new Date().toISOString());

    await axios.post(
      url,
      {},
      { headers: { "X-CRON-KEY": process.env.CRON_SECRET } }
    );

    console.log("Cron ran every minute");
  } catch (error) {
    console.error("Cron failed:", error.message);
  }
});
