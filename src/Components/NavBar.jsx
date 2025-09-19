import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div
      className="
        navbar
        h-20
        bg-[#1a1b1e]                 /* Dark theme */
        border-b border-gray-700
        shadow-md
        px-3 sm:px-6
      "
    > 
      {/* ====== Left Logo ====== */}
      <div className="flex-1">
        <Link
          to={user ? "/" : "/login"}
          className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-white"
        >
          <img
            src="https://i.ibb.co/MygxD0dH/Screenshot-2025-08-27-190008-removebg-preview.png"
            alt="logo"
            className="h-12 sm:h-16 w-auto"
          />
          
        </Link>
      </div>

      {/* ====== Right Menu ====== */}
      {user && (
        <div className="flex items-center text-base sm:text-lg text-white">
          {/* Dropdown Menu */}
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="
                btn btn-ghost btn-circle avatar
                focus:outline-none
                focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-[#1e1f24]
              "
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-pink-500/40 overflow-hidden">
                <img src={user.photoUrl} alt="user" />
              </div>
            </button>

            <ul
              tabIndex={0}
              className="
                menu menu-md dropdown-content
                mt-3
                w-44 sm:w-52
                bg-[#1e1f24]
                border border-gray-700
                rounded-xl
                shadow-xl
                p-2
              "
            >
              <li>
                <Link
                  to="/"
                  className="hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 hover:text-white rounded-lg"
                >
                  Feed
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="flex justify-between hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 hover:text-white rounded-lg"
                >
                  Profile
                  <span className="badge badge-sm bg-pink-500 border-none text-white">
                    New
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 hover:text-white rounded-lg"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/request"
                  className="hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 hover:text-white rounded-lg"
                >
                  Requests
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="
                    w-full text-left
                    hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700
                    hover:text-white
                    rounded-lg
                  "
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
