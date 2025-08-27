import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

const Userfeed = ({ user }) => {
  const {  firstName,_id,lastName, photoUrl, age, gender, about,hobbies } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL+"/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="card bg-base-300 w-full max-w-xs sm:max-w-sm md:max-w-md shadow-xl mx-auto">
      <figure>
        <img
          src={user.photoUrl}
          alt="photo"
          className="w-full h-64 sm:h-72 md:h-96 object-cover rounded-t-xl"
        />
      </figure>
      <div className="card-body p-4 sm:p-6">
        <h2 className="card-title text-base sm:text-lg md:text-xl">{firstName + " " + lastName}</h2>
        {age && gender && <p className="text-sm sm:text-base">{age + ", " + gender}</p>}
        <p className="text-sm sm:text-base">Hobbies: {hobbies}</p>
        <p className="text-sm sm:text-base">{about}</p>
        <div className="card-actions flex flex-col sm:flex-row justify-center gap-2 my-4">
          <button
            className="btn btn-secondary w-full sm:w-auto"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};
export default Userfeed;