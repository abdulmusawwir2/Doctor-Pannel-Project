import { createContext } from "react";
import { doctors } from "../assets/assets";
import axios from "axios";

import { toast } from "react-toastify";
import { useState,useEffect } from "react";

//1step
export const AppContext = createContext();

//2nd step
const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setdoctors] = useState([])
  const [token, settoken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "")
  const [userData, setuserData] = useState(false)
  

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl+"/api/doctor/list");
      if (data.success) {
        setdoctors(data.doctors)
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
      
      if (data.success) {
        setuserData(data.userData)
      }
      else {
        toast.error(data.messsage)
      }
    }
    catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  const value = {
    doctors,getDoctorsData,
    currencySymbol,
    token,
    settoken,
    backendUrl, userData, setuserData,
    loadUserProfileData
  };

  useEffect(() => {
    getDoctorsData()
  }, [])
  
  useEffect(() => {
    if (token) {
     loadUserProfileData()
    } else {
      setuserData(false)
   }
  }, [token])
  

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
