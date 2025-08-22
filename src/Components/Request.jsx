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

      // filter out null users before saving
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
    return <h1 className="flex justify-center my-10">No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-2xl sm:text-3xl mb-6">
        Friend Requests:
      </h1>

      {requests.map((request) => {
        // ✅ safe check
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
            className="flex flex-col sm:flex-row justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-full max-w-xs sm:max-w-2xl mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mx-auto"
                src={photoUrl}
              />
            </div>
            <div className="text-center sm:text-left sm:mx-4 mt-4 sm:mt-0 w-full">
              <h2 className="font-bold text-lg sm:text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-xs sm:text-base">
                  {age + ", " + gender}
                </p>
              )}
              <p className="text-xs sm:text-base">{about}</p>
            </div>
            <div className="flex flex-row gap-2 mt-4 sm:mt-0 w-full sm:w-auto justify-center">
              <button
                className="px-4 py-1 rounded-full border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-red-500 hover:text-white transition-all duration-150 shadow-sm"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="px-4 py-1 rounded-full border border-blue-500 text-xs font-semibold text-blue-600 bg-white hover:bg-blue-500 hover:text-white transition-all duration-150 shadow-sm"
                onClick={() => reviewRequest("accepted", request._id)}
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
