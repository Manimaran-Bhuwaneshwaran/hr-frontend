import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useNavigate, Link } from "react-router-dom";
import { DoorClosed, DoorOpen, List } from "react-bootstrap-icons";

const Navbar = () => {
  const userLogin = useSelector((state) => state?.userLogin);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const handleLogout = () => {
    if (userInfo) {
      navigate("/");
      dispatch(logout());
    }
  };
  return (
    <nav className="bg-white shadow-md items-center  flex gap-1 sm:gap-3 md:gap-5 text-red-700 flex items-center px-4 py-2">
      {userInfo ? (
        <>
          <Link className="mx-4 sm:mx-8 hover:bg-red-700 hover:text-white py-2 sm:px-4 transition-all" to="/">
            <List size={30} />
          </Link>
          <button onClick={handleLogout} className="mx-2  sm:mx-4 flex hover:bg-red-700 hover:text-white transition-all py-2 sm:px-4">Logout</button>
          Welcome, {userInfo?.data?.name}
        </>
      ) : (
        <>
        
          <Link className="mx-4 sm:mx-8 hover:bg-red-700 hover:text-white py-2 sm:px-4 transition-all" to="/">
            <List size={30} />
          </Link>
          <Link to="/admin/login" className="mx-2  sm:mx-4 flex hover:bg-red-700 hover:text-white transition-all py-2 sm:px-4"> <DoorClosed /> Admin Login</Link>
          <Link to="/signin" className="mx-2 sm:mx-4 flex hover:bg-red-700 hover:text-white py-2 transition-all sm:px-4"><DoorOpen /> Signin</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
