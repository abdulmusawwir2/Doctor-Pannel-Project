import React from "react";
import { assets } from "../assets/assets";
const Fotter = () => {
  return (
    <div className="md:mx-10 bg-slate-100 px-5 ">
      <div className="flex flex-col sm:grid grid-cols-[3fr_2fr_1fr] gap-13 my-10 mt-40 text-sm">
        {/* left section */}
        <div className="">
          <img src={assets.logo} className="mb-5 w-40" alt="" />
          <p className="w-full md:w-2/3 text-gray-600 mt-4 leading-6">
            {" "}
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* center section */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* right section */}
        <div>
          <p className="text-xl font-medium mb-5">Get IN Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+8729-28298-292</li>
            <li>abdulmusawwir611@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* ccopyright text */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2024 @ Abdul Musawwir.dev - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Fotter;
