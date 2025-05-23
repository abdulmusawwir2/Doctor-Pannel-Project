import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          About <span className="text-gray-700 font-medium">Us</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <img
            src={assets.about_image}
            alt="About Us Image"
            className="w-full md:max-w-[360px]"
          />
        </div>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p className="text-gray-700 mb-4">
            Welcome to <strong>Prescripto</strong>, your trusted partner in
            managing your healthcare needs conveniently and efficiently. At
            Prescripto, we understand the challenges individuals face when it
            comes to scheduling doctor appointments and managing their health
            records.
          </p>
          <p className="text-gray-700 mb-4">
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p className="text-gray-700 mt-2">
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
