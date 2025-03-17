import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [specialty, setSpecialty] = useState("General Physicial");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext)
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image not selected")
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', specialty);
      formData.append('degree', degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      
      formData.forEach((value,key) => {
        console.log(`${key}: ${value}`)
      })
      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
      
      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setFees('')
        setAbout('')
        setDegree('')
        setAddress1('')
        setAddress2('')

      }
      else {
        toast.error(data.message)
      }
    }
    catch (err) {
      toast.error(err.msg)
      console.log(err);
    }
    // Add your form submission logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200"
    >
      <p className="text-2xl font-semibold mb-6">Add Doctor</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Picture Section */}
        <div className="flex flex-col items-center md:mb-6 md:mb-0">
          <label
            htmlFor="doc-img"
            className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-full cursor-pointer overflow-hidden"
          >
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload Icon"
              className={`${docImg ? "w-full h-full object-cover" : "w-8 h-8"}`}
            />
            {!docImg && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Upload doctor
                <br />
                picture
              </p>
            )}
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />
        </div>

        {/* Doctor Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Input */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Your name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Speciality Select */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Speciality
            </label>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="General Physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Doctor Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Degree Input */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Degree</label>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              placeholder="Degree"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Set Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Address Inputs */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Address</label>
            <input
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Address 1"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 mb-2"
            />
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Address 2"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Experience Select */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Experience
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3 Years</option>
              <option>4 Years</option>
              <option>5 Years</option>
              <option>6 Years</option>
              <option>7 Years</option>
              <option>8 Years</option>
              <option>9 Years</option>
              <option>10+ Years</option>
            </select>
          </div>

          {/* Fees Input */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Fees</label>
            <input
              type="text"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              placeholder="Doctor fees"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
        </div>

        {/* About Doctor Section */}
        <div className="md:col-span-2">
          <label className="block text-gray-600 text-sm mb-1">
            About Doctor
          </label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write about doctor"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            rows="4"
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="bg-indigo-500 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
        >
          Add doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
