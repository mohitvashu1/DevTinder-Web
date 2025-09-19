import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      const validRequests = res.data.data.filter((r) => r.fromUserId);
      dispatch(addRequests(validRequests));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <h1 className="flex justify-center my-10 text-gray-300">
        No Requests Found
      </h1>
    );

  return (
    <div className="text-center my-10 px-4">
      {/* Gradient heading */}
      <h1 className="relative font-bold text-2xl sm:text-3xl text-white mb-8 inline-block">
        Friend Requests
        <span className="absolute left-0 bottom-[-6px] w-full h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full" />
      </h1>

      {requests.map((request) => {
        if (!request?.fromUserId) return null;

        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        } = request.fromUserId;

        return (
          <div
            key={_id}
            className="
              flex flex-col sm:flex-row items-center
              m-4 p-4 gap-4
              rounded-xl
              bg-[#1e1f24]
              hover:bg-[#25262c]
              border border-gray-700
              shadow-lg
              transition-colors duration-200
              w-full max-w-md sm:max-w-2xl mx-auto
            "
          >
            {/* Avatar */}
            <img
              alt="photo"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-2 ring-pink-500/40"
              src={photoUrl}
            />

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-bold text-lg sm:text-xl text-white">
                {firstName + " " + lastName}
              </h2>

              {age && gender && (
                <p className="uppercase text-gray-400 text-xs sm:text-sm">
                  {age + ", " + gender}
                </p>
              )}

              <p className="text-gray-300 text-xs sm:text-sm">{about}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => reviewRequest("rejected", request._id)}
                className="
                  px-4 py-1 sm:px-5 sm:py-2
                  rounded-full
                  bg-gradient-to-r from-gray-600 to-gray-700
                  text-white font-semibold text-sm
                  hover:from-red-500 hover:to-red-600
                  transition-all duration-200
                  shadow-md
                "
              >
                Reject
              </button>

              <button
                onClick={() => reviewRequest("accepted", request._id)}
                className="
                  px-4 py-1 sm:px-5 sm:py-2
                  rounded-full
                  bg-gradient-to-r from-pink-500 to-orange-400
                  text-white font-semibold text-sm
                  hover:from-pink-400 hover:to-orange-300
                  transition-all duration-200
                  shadow-md
                "
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
  