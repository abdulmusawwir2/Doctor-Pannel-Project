import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
// import appointmentModel from "../../../backend/models/appointmentModel";


const Appointment = () => {


  const { docId } = useParams();
  const { doctors, currencySymbol,backendUrl,token,getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo || null);
  };

  const getAvailableSlot = () => {
    // Clear existing slots before generating new ones
    setDocSlots([]);

    // Get the current date and time
    let today = new Date();

    // Initialize an array to store all time slots for 7 days
    let allTimeSlots = [];

    // Loop through the next 7 days
    for (let i = 0; i < 7; i++) {
      // Create a new date object for the current day in the loop
      let currentDate = new Date(today);   
      currentDate.setDate(today.getDate() + i); //gets future 7 days from today     //getDate return just date: eg: 11

      // Set the end time of the current day to 9:00 PM
      let endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0); // 9:00 PM

      // Adjust the start time based on whether it's today or a future day

      // If it's today, set start time to the next hour or 10:00 AM, whichever is later
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        // If the current minutes are greater than 30, round to the next hour, else to the half-hour mark
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 0 : 30);
      } else {
        // For future days, set the start time to 10:00 AM
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      // Initialize an array to store time slots for the current day
      let timeSlots = [];

      // Generate 30-minute time slots until the end time
      while (currentDate < endTime) {
        // Format the current time as a readable string (e.g., "10:30 AM")
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // slotDate = "08_08_2025"
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1 
        let year = currentDate.getFullYear()
        const slotDate = day + "_" + month + "_" + year; 
        const slotTime = formattedTime
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true
        // docInfo.slots_booked["08_08_2025"] = ["10:00 AM", "10:20 AM", "10:40 AM"];
        
        if (isSlotAvailable) {
          // Add the time slot to the array with the full datetime and formatted time
          timeSlots.push({
            datetime: new Date(currentDate), // Full datetime object
            time: formattedTime, // Human-readable time string
          });
        }
        // Increment the current time by 30 minutes for the next slot
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      // Add the generated time slots for the current day to the main array
      allTimeSlots.push(timeSlots);
    }
    // Update the state with all the generated time slots for the 7 days
    setDocSlots(allTimeSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book an appointment');
      return navigate('/login')
    }
    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year 
      console.log(slotDate);

      const { data } = await axios.post(backendUrl + "/api/user/book-appointment", { docId, slotDate, slotTime }, { headers: { token } })
      
      if (data.success) {
        toast.success('Appointment booked successfully');
        getDoctorsData()
        navigate('/my-appointments')

      } else {
        toast.error(data.message)
      }

    }
    catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlot();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  if (!docInfo) return <p>Loading...</p>;

  return (
    <div>
      {/* ------------------  Doctor Details -------------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            src={docInfo.image}
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            alt=""
          />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/* ------doc info :name,degree,experience--- */}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}{" "}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>

          {/* Doctor about */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1 ">
              {docInfo.about}
            </p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment Fee:{" "}
            <span className="text-gray-600">
              {docInfo.fees}
              {currencySymbol}
            </span>
          </p>
        </div>
      </div>

      {/* -------- booking slots----- */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking Slot</p>
        <div className="flex gap-3 item-center w-full overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                key={index}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-blue-700 text-white"
                    : "border border-gray-200"
                }`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? "bg-blue-700 text-white"
                    : "border border-gray-300"
                } `}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button onClick={bookAppointment} className="bg-blue-700 text-white text-sm font-light px-14 py-3 rounded-full my-8">Book An Appointment </button>
      </div>

      {/* -----Listing related doctors   */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      
    </div>
  );
};

export default Appointment;
