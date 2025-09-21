import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import Chat from "./Chat";
const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      const validConnections = res.data.data.filter((c) => c);
      dispatch(addConnections(validConnections));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <h1 className="flex justify-center my-10 text-gray-300">
        No Connections Found
      </h1>
    );

  return (
    <div className="text-center my-10 px-4">
      {/* Header with gradient underline */}
      <h1 className="relative font-bold text-2xl sm:text-3xl text-white mb-8 inline-block">
        My Friends
        <span className="absolute left-0 bottom-[-6px] w-full h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full" />
      </h1>

      {connections.map((connection) => {
        if (!connection) return null;

        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          hobbies,
        } = connection;

        return (
          <div
            key={_id}
            className="
              flex flex-row items-center gap-4
              m-4 p-4
              rounded-xl
              bg-[#1e1f24]
              hover:bg-[#25262c]
              border border-gray-700
              shadow-lg
              transition-colors duration-200
              w-full max-w-md sm:max-w-[40%] mx-auto
            "
          >
            {/* Avatar */}
            <img
              alt="photo"
              className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover ring-2 ring-pink-500/40"
              src={photoUrl}
            />

            {/* Info */}
            <div className="flex-1 text-left">
              <h2 className="font-bold text-lg sm:text-xl text-white">
                {firstName + " " + lastName}
              </h2>

              {age && gender && (
                <p className="uppercase text-gray-400 text-xs sm:text-sm">
                  {age + ", " + gender}
                </p>
              )}

              {hobbies && (
                <p className="font-semibold text-sm sm:text-base text-pink-400">
                  {hobbies}
                </p>
              )}

              <p className="text-gray-300 text-xs sm:text-sm">{about}</p>
            </div>

            {/* Chat Button */}
            <div>
              <Link to={"/chat/"+_id}>
              <button
              className="
                flex items-center justify-center
                w-12 h-12 sm:w-14 sm:h-14
                rounded-md
                bg-gradient-to-r from-pink-500 to-orange-400
                hover:from-pink-400 hover:to-orange-300
                shadow-md
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-[#1e1f24]
              "
            >
              
              <img
                src="https://i.ibb.co/21rVK1fs/images-1-removebg-preview.png"
                alt="Chat"
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain filter brightness-0 invert"
                
              />
              
            </button>
            </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
