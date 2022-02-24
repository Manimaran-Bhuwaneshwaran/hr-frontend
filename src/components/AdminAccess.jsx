import React, { useState, useEffect, Children } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../actions/userActions";
import axios from "axios";
import { Upload } from "react-bootstrap-icons";
const AdminAccess = () => {
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
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo?.data?.isAdmin !== true) {
      navigate("/");
    }
  }, []);

  const uploadHrsign = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "ih1rthv8");
    await axios
      .post("https://api.cloudinary.com/v1_1/vdshgp/image/upload", formData)
      .then((response) => {
        // console.log(response.data.secure_url);
        setUser({ ...user, hrsign: response?.data?.secure_url });
        console.log(user);
      });
  };
  const [certificates, setCertificates] = useState([]);
  const getAllCertificates = async (e) => {
    // e.preventDefault()

    // try {
    const res = await fetch("/api/getAllCertificates", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setCertificates(data);
    console.log("certificates", certificates);
    // } catch (err) {
    //     console.log(err);

    // }
  };
  useEffect(() => {
    if (userRegisterInfo) {
      navigate("/signin");
    }
    getAllCertificates();
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
  const arr = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="w-full ">
      <div className=" text-lg text-white  bg-red-700 px-4 py-2">
        Register an HR
      </div>
      <form onSubmit={submitHandler} className="w-full px-4 py-2 sm:w-[20rem] ">
        <input
          className="w-full  px-2 py-2 my-1 bg-slate-100"
          onChange={handleChange}
          type="text"
          name="name"
          value={user.name}
          placeholder="name"
        />
        <input
          className="w-full  px-2 py-2 my-1 bg-slate-100"
          onChange={handleChange}
          type="email"
          name="email"
          value={user.email}
          placeholder="email"
        />
        <input
          className="w-full   px-2 py-2 my-1 bg-slate-100"
          onChange={handleChange}
          type="password"
          name="password"
          value={user.password}
          placeholder="password"
        />

        <label
          htmlFor="file"
          className="my-1 flex w-full text-white text-lg gap-4  bg-red-700 py-2 px-4"
        >
          Hr Sign
          <Upload size={25} />
          <img
            src={user?.hrsign}
            className="bg-slate-500  h-[2rem] w-[2rem]  rounded-full border-none "
          />
        </label>
        <input
          id="file"
          onChange={uploadHrsign}
          type="file"
          className="hidden"
        />

        <input
          className=" w-full  px-2 py-2 my-1 bg-slate-100"
          onChange={handleChange}
          type="text"
          name="hrposition"
          value={user.hrposition}
          placeholder="hrposition"
        />
        <button type="submit" className="w-full bg-red-500  py-2 px-4 text-white">
          Register
        </button>
      </form>
      <h1 className="w-full  my-4 py-2 px-4 text-center  bg-red-700 text-red-50 ">CERTIFICATES DATA</h1>
      <table  className="block h-[50vh] w-[100vw] overflow-scroll">
        <tr>
          <th className="">Sr. No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Type</th>
          <th>certificate Id</th>
          <th>Issued By</th>
        </tr>
        {Children.toArray(
          certificates?.data?.map((c, i) => {
            const tableClass=i%2==0?'bg-slate-100 py-1   px-2 hover:bg-red-200 cursor-pointer':' cursor-pointer hover:bg-red-400 py-1 bg-white px-2'
           return <>
              <tr key={c._id} className='w-full'>
                <td className={tableClass}>{i+1}</td>
                <td className={tableClass}>{c.name}</td>
                <td className={tableClass}>{c.email}</td>
                <td className={tableClass}>{c.type}</td>
                <td className={tableClass}>{c._id}</td>
                <td className={tableClass}>{c.hrId}</td>
              </tr>
            </>
          })
        )}
      </table>
    </div>
  );
};

export default AdminAccess;
