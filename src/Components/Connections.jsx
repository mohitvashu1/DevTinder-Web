import axios from "axios";  
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get( BASE_URL+"/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return ;

  if (connections.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-2xl sm:text-3xl mb-6">My Friends</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about, hobbies } = connection;

        return (
          <div
            key={_id}
            className="flex flex-col sm:flex-row items-center m-4 p-4 rounded-lg bg-base-300 w-full max-w-xs sm:max-w-2xl mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mx-auto"
                src={photoUrl}
              />
            </div>
            <div className="text-center sm:text-left sm:mx-4 mt-4 sm:mt-0 w-full">
              <h2 className="font-bold text-lg sm:text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p className="uppercase text-xs sm:text-base">{age + ", " + gender}</p>}
              <p className="font-bold text-sm sm:text-base">{hobbies}</p>
              <p className="text-xs sm:text-base">{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;