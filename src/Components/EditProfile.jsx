import { useState } from "react";
import UserFeed from "./Userfeed";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { BASE_URL } from "../utils/constants.js";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [hobbies, setHobbies] = useState(user.hobbies);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, hobbies, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || "Error saving profile");
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "DevTinder");
    data.append("cloud_name", "darr4svkz");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/darr4svkz/image/upload",
      { method: "POST", body: data }
    );
    const uploadedImageURL = await res.json();
    setPhotoUrl(uploadedImageURL.url);
  };

  return (
    <>
      {/* ======= Main Container ======= */}
      <div
        className="
          flex flex-col md:flex-row
          justify-center
          md:items-stretch       /* stretch children to equal height on desktop */
          gap-8
          my-8 px-3
        "
      >
        {/* === Edit Form Card === */}
        <div className="w-full max-w-[20rem] sm:max-w-[22rem] flex md:flex-1">
          <div
            className="
              bg-[#1e1f24]
              hover:bg-[#25262c]
              border border-gray-700
              rounded-xl
              shadow-lg
              p-5
              w-full
              transition-colors duration-200
              flex flex-col
            "
          >
            <h2 className="text-center text-white text-lg sm:text-xl font-bold mb-4">
              Edit Profile
            </h2>

            <label className="form-control w-full mb-3">
              <span className="label-text text-gray-300 mb-1">First Name</span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control w-full mb-3">
              <span className="label-text text-gray-300 mb-1">Last Name</span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>

            <span className="label-text text-gray-300 mb-1">Profile Photo</span>
            <input
              type="file"
              className="file-input w-full mb-3"
              onChange={handleFileUpload}
            />

            <label className="form-control w-full mb-3">
              <span className="label-text text-gray-300 mb-1">Age</span>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control w-full mb-3">
              <span className="label-text text-gray-300 mb-1">Gender</span>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control w-full mb-3">
              <span className="label-text text-gray-300 mb-1">Hobbies</span>
              <input
                type="text"
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control w-full mb-4">
              <span className="label-text text-gray-300 mb-1">About</span>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="mt-auto flex justify-center pt-4">
              <button
                onClick={saveProfile}
                className="
                  px-6 py-2
                  rounded-full
                  bg-gradient-to-r from-pink-500 to-orange-400
                  text-white font-semibold
                  hover:from-pink-400 hover:to-orange-300
                  transition-all duration-200
                  shadow-md
                "
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* === Live Preview Card === */}
        <div className="w-full max-w-[20rem] sm:max-w-[22rem] flex md:flex-1">
          <div className="flex flex-col items-center w-full bg-[#1e1f24] border border-gray-700 rounded-xl shadow-lg p-5">
            <h1 className="relative font-bold text-2xl sm:text-3xl text-white mb-8 text-center inline-block">
              Profile Preview
              <span className="absolute left-0 bottom-[-6px] w-full h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full" />
            </h1>

            <div className="w-full">
              <UserFeed
                user={{
                  firstName,
                  lastName,
                  photoUrl,
                  age,
                  gender,
                  about,
                  hobbies,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
