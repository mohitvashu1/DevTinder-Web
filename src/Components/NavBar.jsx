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
     <div className="navbar bg-base-200 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost normal-case text-xl">
      <img
        src="https://tinder.com/static/tinder.png"
        alt="logo"
        className="w-10 h-10 mr-2"
      />
      DevTINDER
    </Link>
  </div>
  {user &&(
    <div className="flex gap-2">
      <p className='my-1 '>Welcome , {user.firstName}</p>
    <div className="dropdown mx-10 dropdown-end ">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
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
          <a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
  )}
</div>
  )
}

export default NavBar 