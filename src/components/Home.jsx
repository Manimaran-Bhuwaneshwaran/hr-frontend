import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import certificateLogin from "../images/certificateLogin.svg";

const Home = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();

  let navigate = useNavigate();
  return (
    <>
      {userInfo ? (
        <div className="flex justify-center items-center">
          <h1 className=" grid place-items-center   bg-red-700 w-[10rem] h-[2.5rem] text-white">
            Create certificate of:
          </h1>
          <Link
            className=" w-full block my-2 grid place-items-center hover:animate-bounce  bg-red-500 w-[10rem] h-[2.5rem] text-white"
            to="/sendcompletioncertificate"
          >
            <button>Completion</button>
          </Link>
          <Link
            className=" w-full block my-2 grid place-items-center hover:animate-bounce  bg-red-500 w-[10rem] h-[2.5rem] text-white"
            to="/sendparticipationcertificate"
          >
            <button>Participation</button>
          </Link>
          <Link
            className=" w-full block my-2 grid place-items-center hover:animate-bounce  bg-red-500 w-[10rem] h-[2.5rem] text-white"
            to="/sendappreciationcertificate"
          >
            <button>Appreciation</button>
          </Link>
          <Link
            className=" w-full block my-2 grid place-items-center hover:animate-bounce  bg-red-500 w-[10rem] h-[2.5rem] text-white"
            to="/sendappointmentletter"
          >
            <button>Appointment</button>
          </Link>
          <Link
            className=" w-full block my-2  grid place-items-center hover:animate-bounce  bg-red-500 w-[10rem] h-[2.5rem] text-white"
            to="/sendLOR"
          >
            <button>LOR</button>
          </Link>
        </div>
      ) : (
        <div className="">
          <img src={certificateLogin} className="w-[80vw] h-[80vh] mx-auto" />
          <Link
            to="/signin"
            className="absolute grid place-items-center hover:animate-bounce top-[50vh] left-[50vw] bg-red-500 w-[10rem] h-[2.5rem] text-white"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
