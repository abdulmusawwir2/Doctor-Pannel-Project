import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Fotter from "./components/Fotter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingChatWidget from "./components/FloatingChatWidget";
import ChoosePortal from "./pages/ChoosePortal";

const App = () => {
  const { pathname } = useLocation();
  const isPortalPage = pathname === "/"; // only true on / (Choose Portal)

  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />

      {/* Hide Navbar + Chat + Footer on portal page */}
      {!isPortalPage && <Navbar />}
      {!isPortalPage && <FloatingChatWidget />}

      <Routes>
        {/* Portal page */}
        <Route path="/" element={<ChoosePortal />} />

        {/* Patient app pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>

      {!isPortalPage && <Fotter />}
    </div>
  );
};

export default App;
