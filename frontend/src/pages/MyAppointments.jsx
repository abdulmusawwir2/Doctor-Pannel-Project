import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

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

  const navigate = useNavigate()
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

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)

        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }

        } catch (error) {
          console.log(error)
          toast.error(error.message)

        }



      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        console.log(data.order)
        initPay(data.order)
      }
    }
    catch (err) {

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
              <p className="text-sm mt-1">
                <span className="text-sm text-neutral-700 font-medium ">
                  Date & Time:
                </span>
                {slotDateFormat(items.slotDate)} | {items.slotTime}
              </p>
            </div>

            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!items.cancelled && items.payment && <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">Paid</button>}
              {!items.cancelled && !items.payment && (
                <button onClick={() => appointmentRazorpay(items._id)} className="text-sm  text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                  Pay Online
                </button>
              )}
              {!items.cancelled && (
                <button
                  onClick={() => !items.payment && cancelAppointment(items._id)}
                  disabled={items.payment}
                  className={`text-sm text-center sm:min-w-48 py-2 border rounded transition-all duration-300 ${items.payment
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-stone-500 hover:bg-red-600 hover:text-white"
                    }`}
                >
                  {items.payment ? "Cannot Cancel (Paid)" : "Cancel Appointment"}
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


// () => cancelAppointment(items._id) is a function that will be triggered on button click.