import { useState } from "react";
import UserFeed from './Userfeed';
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
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    try {
      const res = await axios.patch(
         BASE_URL+"/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          hobbies,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
   

    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "DevTinder");
    data.append("cloud_name", "darr4svkz");

    const res = await fetch("https://api.cloudinary.com/v1_1/darr4svkz/image/upload", {
      method: "POST",
      body: data,
    });
    const uploadedImageURL = await res.json();
    setPhotoUrl(uploadedImageURL.url); // Set the photoUrl state
  };

  return (
    <>
    
      <div className="flex flex-col items-center justify-center gap-6 my-6 px-2 sm:px-0">
        
        <div className="w-full max-w-md">
          <div className="card bg-base-300 w-full shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center text-lg sm:text-xl">Edit Profile</h2>
              <div>
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">Last Name:</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <div className="label">
                  <span className="label-text">Profil Photo :</span>
                </div>
                
                <input
                  type="file"
                  className="file-input w-full my-2"
                  onChange={handleFileUpload}
                />
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    className="input input-bordered w-full"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">Hobbies:</span>
                  </div>
                  <input
                    type="text"
                    value={hobbies}
                    className="input input-bordered w-full"
                    onChange={(e) => setHobbies(e.target.value)}
                  />
                </label>
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary w-full sm:w-auto" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserFeed
          user={{ firstName, lastName, photoUrl, age, gender, about, hobbies }}
        />
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