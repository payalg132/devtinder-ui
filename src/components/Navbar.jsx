import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    try{
      axios.post(BASE_URL + "logout", {}, {withCredentials: true});
      dispatch(removeUser())
      navigate('/login');
    } catch {

    }
  }

  return (
    <>
        <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  <div className="flex gap-2">
    {user && (
      <div className="flex items-center">
        <div className="">Welcome, {user.firstName}</div>
      <div className="dropdown dropdown-end flex">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-5">
        <div className="w-10 rounded-full">
          <img
            alt="Photo URL"
            src={user.phtoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
    </div>
  )}
  </div>
</div>
    </>
  )
}

export default Navbar