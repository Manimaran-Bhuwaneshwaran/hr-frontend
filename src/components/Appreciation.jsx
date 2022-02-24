import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Appreciation = () => {
  const navigate = useNavigate();
  let name, value;
  const handleChange = (e) => {
    console.log(form);
    name = e.target.name;
    value = e.target.value;
    setForm({ ...form, [name]: value });
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, []);
  const [form, setForm] = useState({
    hrId: userInfo?.data?._id,
    name: "",
    email: "",
    sessiontype: "",
    title: "",
    date: "",
  });

  const sendAppreciationCertificate = async (e) => {
    e.preventDefault();

    // const { name, domain, date1, date2, email } = user;
    const res = await fetch("/api/sendAppreciationCertificate", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hrId: form.hrId,
        name: form.name,
        email: form.email,
        sessiontype: form.sessiontype,
        title: form.title,
        date: form.date,
      }),
    });
    const data = await res.json();
    if (data.status === 500 || !data) {
      window.alert(
        "Unsuccessful. Some error occured. Did you fill all the details?"
      );
      console.log(
        "Unsuccessful. Some error occured. Did you fill all the details?"
      );
    } else {
      window.alert("Successfully sent the mail to the recipient");
      console.log("Successfully sent the mail to the recipient");
      navigate("/");
    }
  };

  return (
    <div className="bg-white h-[calc(100vh-2rem)] flex justify-center items-center flex-wrap ">
      <form onSubmit={sendAppreciationCertificate} className="w-[20rem]">
        <h1 className="bg-red-700 px-4 w-full py-2 text-white">
          Certificate of Appreciation
        </h1>
        <input
          className="w-full px-2 py-2 bg-slate-100 my-1"
          name="name"
          placeholder="name"
          type="text"
          onChange={handleChange}
        />

        <input
          className="w-full px-2 py-2 bg-slate-100 my-1"
          name="email"
          placeholder="email"
          type="email"
          onChange={handleChange}
        />

        <input
          className="w-full px-2 py-2 bg-slate-100 my-1"
          name="sessiontype"
          placeholder="session type example: Workshop"
          type="text"
          onChange={handleChange}
        />

        <input
          className="w-full px-2 py-2 bg-slate-100 my-1"
          name="title"
          placeholder="title"
          type="text"
          onChange={handleChange}
        />

        <div className="bg-red-700 px-4 w-full py-2 text-white"> date</div>
        <input
          className="w-full px-2 py-2 bg-slate-100 my-1"
          name="date"
          placeholder="date"
          type="date"
          onChange={handleChange}
        />

        <button className="bg-red-500 w-full py-2 text-white" type="submit">
          Send certificate email
        </button>
      </form>
    </div>
  );
};

export default Appreciation;
