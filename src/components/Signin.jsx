import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
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
      navigate("/");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <div className="bg-white h-[calc(100vh-2rem)] flex justify-center items-center flex-wrap ">
        <form
          noValidate
          onSubmit={submitHandler}
          className="w-[20rem] bg-white"
        >
            <img src={logo} className='w-[30%] rounded-full relative bottom-[25px] mx-auto my-4' />
          <input
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            className="w-full px-2 py-2 bg-slate-100 my-1"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            label="Password"
            type="password"
            id="password"
            className="w-full px-2 py-2 bg-slate-100 my-1"
            placeholder="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button type="submit" className="bg-red-500 w-full py-2 text-white">
            Login
          </button>
          <div>
            <div className="my-5 ">
              Don't have an account?&nbsp;
              <Link to={"/signup"} className='text-red-500 font-bold'>Create Account</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Signin;
