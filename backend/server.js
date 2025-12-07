import express from "express";
import cors from "cors"; //used
import "dotenv/config"; //used to load environment variables from .env file
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import chatRouter from "./routes/chatRoute.js";
import reminderRouter from "./routes/remainderRoute.js";
import "./routes/cron.js";

//app config..
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json()); // used to parse json data to be sent in the body of the request
app.use(cors()); // use to connect backend with frontend


app.use("/api/admin", adminRouter);
//localhost:4000/api/admin/add-doctor
//localhost:400/api/admin/admin-dashboard
//localhost:400/api/admin/all-appointment
//localhost:400/api/admin/doctor-list

app.use("/api/doctor", doctorRouter); 
//localhost:400/api/doctor/list

app.use("/api/user", userRouter);

app.use("/api/chat",chatRouter);
app.use("/api/reminders", reminderRouter);

app.get("/", (req, res) => {
  res.send("Api Working Great");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
