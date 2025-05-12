import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setappointments] = useState([]);
  const months = [
    "",
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const slotDateFormat = ( slotDate ) => {
    const dateArray = slotDate.split('_')
    return dateArray[0]+ " " + months[Number(dateArray[1])]+ " " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setappointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const cancelAppointment = async(appointmentId) => {
    try {
      // console.log(appointmentId)
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }
      else {
        toast.error(data.message)
      }
    }
    catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div>
        {appointments.map((items, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b "
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={items.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {items.docData.name}
              </p>
              <p> {items.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1"> Address</p>
              <p className="text-xs"> {items.docData.address.line1}</p>
              <p className="text-xs"> {items.docData.address.line2}</p>
              <p text-sx mt-1m>
                <span className="text-sm text-neutral-700 font-medium ">
                  Date & Time:
                </span>
                {slotDateFormat(items.slotDate)} | {items.slotTime}
              </p>
            </div>

            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!items.cancelled &&  (
                <button className="text-sm  text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                  Pay Online
                </button>
              )}
              {!items.cancelled && (
                <button
                  onClick={() => cancelAppointment(items._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment{" "}
                </button>
              )}
              {items.cancelled && <button className="sm:min-w-48 py-2 border  border-red-500 text-red-500">Appointment Cancelled</button> }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
