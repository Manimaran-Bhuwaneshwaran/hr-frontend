import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../actions/userActions";
import logo from "../images/theLogo.jpeg";
import axios from "axios";
import { Upload } from "react-bootstrap-icons";
const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    hrsign: "",
    hrposition: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { userRegisterInfo } = userRegister;

  const uploadHrsign = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "ih1rthv8");
    await axios
      .post("https://api.cloudinary.com/v1_1/vdshgp/image/upload", formData)
      .then((response) => {
        // console.log(response.data.secure_url);
        setUser({ ...user, hrsign: response.data.secure_url });
        console.log(user);
      });
  };
  useEffect(() => {
    if (userRegisterInfo) {
      navigate("/signin");
    }
  }, [userRegisterInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // if (password !== confirmPassword) {
    //   setMessage("Passwords do not match");
    // } else {
    //   //dispatch
    //   dispatch(register(name, email, password));
    // }
    dispatch(
      register(
        user.name,
        user.email,
        user.password,
        user.hrsign,
        user.hrposition
      )
    );
    navigate("/signin");
  };
  let name, value;
  const handleChange = (e) => {
    console.log(user);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  return (
    <div className=" h-[calc(100vh-2rem)] flex justify-center items-center">
      <form onSubmit={submitHandler} className="w-[20rem]">
        <img
          src={logo}
          className="w-32 rounded-full mx-auto relative bottom-[40px]"
        />
        <input
          onChange={handleChange}
          type="text"
          name="name"
          className="w-full px-2 py-2 my-1 bg-slate-100"
          value={user.name}
          placeholder="name"
        />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          className="w-full px-2 py-2 my-1 bg-slate-100"
          value={user.email}
          placeholder="email"
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          className="w-full px-2 py-2 my-1 bg-slate-100"
          value={user.password}
          placeholder="password"
        />

        <label htmlFor="file" className="my-1 flex">
          <Upload size={30} />
          <img
            src={user.hrsign}
            className="bg-slate-500  h-[2rem] w-[2rem]  rounded-full border-none mx-5"
          />
        </label>
        <input
          id="file"
          onChange={uploadHrsign}
          type="file"
          className="hidden"
        />

        <input
          onChange={handleChange}
          type="text"
          className="w-full px-2 py-2 my-1 bg-slate-100"
          name="hrposition"
          value={user.hrposition}
          placeholder="HR Position"
        />
        <button type="submit" className="w-full  bg-red-500 py-2  text-white">
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
