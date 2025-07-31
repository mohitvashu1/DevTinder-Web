import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {

  const user = useSelector((store) => store.user);
  const  dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async() =>{
    try{
      const res = await axios.post(
        "http://localhost:3001/logout",
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
     <div className="navbar h-24   bg-base-200 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost normal-case text-2xl">
      <img
        src="https://tinder.com/static/tinder.png"
        alt="logo"
        className="w-10 h-10 mr-2"
      />
      DevTINDER
    </Link>
  </div>
  <ul className="menu bg-base-200 flex-1  lg:menu-horizontal rounded-box">
  <li>
    <a>
      <Link to='/' className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      Home</Link>
      
      
    </a>
  </li>
  <li>
    <a>
      <Link to='/request'>
      Request
      <span className="badge badge-xs m-1 badge-warning">NEW</span>
      </Link>
    </a>
  </li>
  <li>
    <a>
      <Link to='/profile'>
      My Profile
      </Link>
    </a>
  </li>
</ul>
  {user &&(
    <div className="flex text-xl gap-2">
      <p className='my-1 '>Welcome , {user.firstName}</p>
    <div className="dropdown mx-10 dropdown-end ">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-14 h-14  rounded-lg">
          <img
            alt="user photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-md dropdown-content bg-base-100  rounded-box z-1 mt-3 w-52  p-2 shadow">
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
          <a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
  )}
</div>
  )
}

export default NavBar 