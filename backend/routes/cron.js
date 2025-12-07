import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

cron.schedule("* * * * *", async () => {
  try {
    await axios.post(
      process.env.CRON_URL,
      {},
      { headers: { "X-CRON-KEY": process.env.CRON_SECRET } }
    );

    console.log("Cron ran every minute");
  } catch (error) {
    console.error("Cron failed:", error.message);
  }
});
