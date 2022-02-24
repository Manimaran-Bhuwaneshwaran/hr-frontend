import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LOR = () => {
  const navigate = useNavigate();
  let name, value;
  const handleChange = (e) => {
    e.preventDefault();
    console.log(form);
    name = e.target.name;
    value = e.target.value;
    setForm({ ...form, [name]: value });
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [isMale, setIsMale] = useState(true);

  const [formData, setFormData] = useState({
    hrId: userInfo?.data?._id,
    name: "",
    email: "",
    domain: "",
    gender: "male",
    hrsignurl: userInfo?.data?.hrsign,
    hrname: userInfo?.data?.name,
    hrposition: userInfo?.data?.hrposition,
    date1: "",
    date2: "",
  });
  // const userLogin = useSelector((state) => state.userLogin);
  // const { loading, error, userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      // navigate("/")
    }
  }, []);

  const sendLOR = async (e) => {
    e.preventDefault();

    // const { name, domain, date1, date2, email } = user;
    const res = await fetch("/api/sendLOR", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hrId: form.hrId,
        name: form.name,
        email: form.email,
        domain: form.domain,
        gender: form.gender,
        hrsignurl: form.hrsignurl,
        hrname: form.hrname,
        hrposition: form.hrposition,
        date1: form.date1,
        date2: form.date2,
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
  // name, email, domain, gender, hrsignurl, hrname, hrposition, date1, date2
  return (
    <div className="bg-white h-[calc(100vh-2rem)] flex justify-center items-center flex-wrap ">
      <form className="w-[20rem] sm:w-[40rem] flex flex-wrap" onSubmit={sendLOR}>
          <div className="w-[20rem] ">
        <h1 className="bg-red-700 px-4 w-full py-2 text-white">LOR</h1>
        <input
          className="w-full px-2 py-2 bg-slate-100 my-1"
          onChange={handleChange}
          placeholder="name"
          name="name"
          type="text"
          value={formData.name}
        />
        <input
          className="w-full px-2 py-2 bg-slate-100 my-1"
          onChange={handleChange}
          placeholder="email"
          name="email"
          type="email"
          value={formData.email}
        />
        <input
          className="w-full px-2 py-2 bg-slate-100 my-1"
          onChange={handleChange}
          placeholder="domain"
          name="domain"
          type="text"
          value={formData.domain}
        />
        </div>
        <div className="w-[20rem]" >
        <div className="bg-red-700 px-4 w-full py-2 text-white">
          Select Gender: <b>{formData.gender}</b>
        </div>

        <div className="my-2 flex gap-4">
          <input
            className=" px-2 py-2 bg-slate-100 my-1"
            type="radio"
            onClick={() => setFormData({ ...formData, gender: "male" })}
            id="male"
            name="gender"
            value="male"
          />
          <label htmlFor="male">Male</label>
          <input
            className=" px-2 py-2 bg-slate-100 my-1"
            type="radio"
            onClick={() => setFormData({ ...formData, gender: "female" })}
            id="female"
            name="gender"
            value="female"
          />
          <label htmlFor="female">Female</label>
        </div>

        <div>
          <div className="bg-red-700 px-4 w-full py-2 text-white">
            {" "}
            Start date
          </div>
          <input
            className="w-full px-2 py-2 bg-slate-100 my-1"
            onChange={handleChange}
            placeholder="Start Date"
            name="date1"
            type="date"
            value={formData.date1}
          />
        </div>
        <div>
          <div className="bg-red-700 px-4 w-full py-2 text-white">
            {" "}
            End Date
          </div>

          <input
            className="w-full px-2 py-2 bg-slate-100 my-1"
            onChange={handleChange}
            placeholder="End Date"
            name="date2"
            type="date"
            value={formData.date2}
          />
        </div>
        </div>
        <button
          className="w-full bg-red-500 py-2 px-4 text-white"
          type="submit"
        >
          Send certificate email
        </button>

      </form>
    </div>
  );
};

export default LOR;
