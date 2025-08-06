import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';


const NavBar = () => {

  const user = useSelector((store) => store.user);
  const  dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async() =>{
    try{
      const res = await axios.post(
        BASE_URL+"/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser())
      return navigate("/login");
    }catch(err) {
      console.error("Logout failed", err);
    }
  }

  return (
    <div className="navbar h-20 bg-base-200 shadow-sm px-2 sm:px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl sm:text-2xl px-1 sm:px-2">
          <img
            src="https://tinder.com/static/tinder.png"
            alt="logo"
            className="w-8 h-8 sm:w-10 sm:h-10 mr-2"
          />
          <span className="inline">DevTINDER</span>
        </Link>
      </div>

      {user && (
        <div className="flex items-center text-base sm:text-xl">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="rounded-full w-10 h-10 sm:w-[50px] sm:h-[50px]">
                <img
                  alt="user photo"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content bg-base-100 rounded-box z-10 mt-3 w-40 sm:w-52 p-2 shadow"
            >
              <li>
                <Link to='/' className="justify-between">
                  Feed
                </Link>
              </li>
              <li>
                <Link to='/profile' className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to='/connections' className="justify-between">
                  Connections
                </Link>
              </li>
              <li>
                <Link to='/request' className="justify-between">
                  Requests
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar;