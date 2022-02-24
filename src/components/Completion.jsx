import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Completion = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    }
  }, []);
  let name, value;
  const handleChange = (e) => {
    console.log(form);
    name = e.target.name;
    value = e.target.value;
    setForm({ ...form, [name]: value });
  };
  const [form, setForm] = useState({
    hrId: userInfo?.data?._id,
    name: "",
    domain: "",
    date1: "",
    date2: "",
    email: "",
  });

  const sendCompletionCertificate = async (e) => {
    e.preventDefault();

    // const { name, domain, date1, date2, email } = user;
    const res = await fetch("/api/sendCompletionCertificate", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hrId: form.hrId,
        name: form.name,
        domain: form.domain,
        date1: form.date1,
        date2: form.date2,
        email: form.email,
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
      <form onSubmit={sendCompletionCertificate} className="w-[20rem]">
        <h1 className="bg-red-700 px-4 w-full py-2 text-white">Certificate of completion</h1>
        <input
          name="name"
          placeholder="name"
          className="w-full px-2 py-2 bg-slate-100 my-1"
          type="text"
          onChange={handleChange}
        />
        <input
          className="w-full px-2 py-2 bg-slate-100 my-1"
          name="domain"
          placeholder="domain"
          type="text"
          onChange={handleChange}
        />
        <div className="bg-red-700 px-4 w-full py-2 text-white">start date</div>
        <input
          className="w-full px-2 py-2 bg-slate-100 my-1"
          name="date1"
          placeholder="startdate"
          type="date"
          onChange={handleChange}
        />

        <div className="bg-red-700 px-4 w-full py-2 text-white">last date</div>
        <input
          className="w-full px-2 py-2 bg-slate-100 my-1"
          name="date2"
          placeholder="lastdate"
          type="date"
          onChange={handleChange}
        />
        <input
          className="w-full px-2 py-2 bg-slate-100 my-1"
          name="email"
          placeholder="email"
          type="email"
          onChange={handleChange}
        />
        <button  className="bg-red-500 w-full py-2 text-white" type="submit">Send certificate email</button>
      </form>
    </div>
  );
};

export default Completion;
