import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setuserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setimage] = useState(null);

  const updateUserProfileData = async () => {
    // Save updated profile logic can be implemented here

    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setimage(false);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-4 text-sm">
        <div>
          {isEdit ? (
            <label htmlFor="image">
              <div className="relative">
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                  className="w-36 rounded mb-2"
                />
                {!image && (
                  <img
                    src={assets.upload_icon}
                    alt="Upload Icon"
                    className="absolute bottom-0 right-0 w-8 cursor-pointer"
                  />
                )}
              </div>
              <input
                type="file"
                id="image"
                hidden
                onChange={(e) => setimage(e.target.files[0])}
              />
            </label>
          ) : (
            <img
              className="w-36 rounded"
              src={userData.image}
              alt="Profile Picture"
            />
          )}
        </div>

        <div>
          {isEdit ? (
            <input
              className="bg-gray-100 text-3xl font-medium w-full"
              type="text"
              value={userData.name}
              onChange={(e) =>
                setuserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="font-medium text-3xl text-neutral-800">
              {userData.name}
            </p>
          )}
        </div>

        <hr className="bg-zinc-400 h-[1px] border-none" />

        <div>
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[3fr_1fr] gap-y-2.5 mt-3 text-neutral-800">
            <p className="font-medium">Email ID:</p>
            <p>{userData.email}</p>

            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setuserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p>{userData.phone}</p>
            )}

            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div>
                <input
                  className="bg-gray-200 mb-2 w-full"
                  onChange={(e) =>
                    setuserData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                  value={userData?.address?.line1 || ""}
                  type="text"
                  placeholder="Line 1"
                />
                <input
                  className="bg-gray-200 w-full"
                  onChange={(e) =>
                    setuserData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value,
                      },
                    }))
                  }
                  value={userData?.address?.line2 || ""}
                  type="text"
                  placeholder="Line 2"
                />
              </div>
            ) : (
              <p className="text-gray-500">
                {userData?.address?.line1 || "N/A"} <br />
                {userData?.address?.line2 || "N/A"}
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <div>
              <p className="font-medium">Gender:</p>
              {isEdit ? (
                <select
                  onChange={(e) =>
                    setuserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  value={userData.gender}
                  className="bg-gray-100 w-full"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p>{userData.gender}</p>
              )}
            </div>

            <div>
              <p className="font-medium">Birthday:</p>
              {isEdit ? (
                <input
                  type="date"
                  className="bg-gray-100 w-full"
                  onChange={(e) =>
                    setuserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  value={userData.dob}
                />
              ) : (
                <p>{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          {isEdit ? (
            <button
              className="border border-blue-500 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-blue-500 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
