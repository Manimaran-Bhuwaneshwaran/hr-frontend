import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../actions/userActions";
import logo from '../images/theLogo.jpeg'
// Importing Header

function Signin({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      // if (userInfo.data.isInstructor === true) {
      //   history.push("/instructorHomePage");
      // } else
      if (userInfo.data.isAdmin === true) {
        navigate("/admin/access");
      } else {
        window.alert("you are not an admin");
        dispatch(logout());
        navigate("/signin");
      }
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <div className=" h-[calc(100vh-2rem)] flex justify-center items-center">

        <form noValidate onSubmit={submitHandler} className="w-[20rem]">
          <img
            src={logo}
            className="w-[30%] rounded-full relative bottom-[25px] mx-auto my-4"
          />

          <input
            className="w-full px-2 py-2 my-1 bg-slate-100"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="w-full px-2 py-2 my-1 bg-slate-100"
            name="password"
            label="Password"
            type="password"
            id="password"
            placeholder="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button
            type="submit"
            className="w-full  bg-red-500 py-2  text-white"
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}
export default Signin;
