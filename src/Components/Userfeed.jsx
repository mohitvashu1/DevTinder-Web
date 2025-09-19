import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

const Userfeed = ({ user }) => {
  const { firstName, _id, lastName, photoUrl, age, gender, about, hobbies } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  return (
    <div
      className="
        bg-[#1e1f24]
        hover:bg-[#25262c]
        border border-gray-700
        rounded-xl
        shadow-xl
        overflow-hidden
        transition-colors duration-200
        w-full
        max-w-[18rem]
        sm:max-w-[20rem]
        md:max-w-[22rem]
        mx-auto
      "
    >
      <figure>
        <img
          src={photoUrl}
          alt="photo"
          className="w-full h-56 sm:h-64 md:h-72 object-cover"
        />
      </figure>

      <div className="p-4 sm:p-5 text-center">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">
          {firstName + " " + lastName}
        </h2>

        {age && gender && (
          <p className="uppercase text-gray-400 text-xs sm:text-sm mb-2">
            {age + ", " + gender}
          </p>
        )}

        {hobbies && (
          <p className="font-semibold text-pink-400 text-xs sm:text-sm mb-1">
            Hobbies: {hobbies}
          </p>
        )}

        <p className="text-gray-300 text-xs sm:text-sm mb-3">{about}</p>

        <div className="flex flex-col sm:flex-row justify-center gap-2">
          {/* Ignore Button */}
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="
              px-4 py-1.5
              rounded-full
              bg-gradient-to-r from-gray-600 to-gray-700
              text-white font-semibold text-sm
              hover:from-red-500 hover:to-red-600
              transition-all duration-200
              shadow-md
              focus:outline-none
              active:ring-2 active:ring-gray-500 active:ring-offset-2 active:ring-offset-[#1e1f24]
            "
          >
            Ignore
          </button>

          {/* Interested Button */}
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="
              px-4 py-1.5
              rounded-full
              bg-gradient-to-r from-pink-500 to-orange-400
              text-white font-semibold text-sm
              hover:from-pink-400 hover:to-orange-300
              transition-all duration-200
              shadow-md
              focus:outline-none
              active:ring-2 active:ring-pink-400 active:ring-offset-2 active:ring-offset-[#1e1f24]
            "
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default Userfeed;
