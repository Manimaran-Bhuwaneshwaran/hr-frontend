import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Appointment = () => {
    const navigate = useNavigate()
    let name, value;
    const handleChange = (e) => {
        e.preventDefault()
        console.log(form);
        name = e.target.name;
        value = e.target.value;
        setForm({ ...form, [name]: value });
    };
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    const [isMale, setIsMale] = useState(true)

    const [form, setForm] = useState({
        hrId: userInfo?.data?._id,
        name: "",
        email: "",
        role: "",
        hrsignurl: userInfo?.data?.hrsign,
        hrname: userInfo?.data?.name,
        hrposition: userInfo?.data?.hrposition,


    });

    useEffect(() => {
        if (!userInfo) {
            // navigate("/")
        }

    }, [])
    const sendAppointmentLetter = async (e) => {
        e.preventDefault();

        // const { name, domain, date1, date2, email } = user;
        const res = await fetch("/api/sendAppointmentLetter", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                hrId: form.hrId, name: form.name, email: form.email, role: form.role, hrsignurl: form.hrsignurl, hrname: form.hrname, hrposition: form.hrposition
            })

        })
        const data = await res.json();
        if (data?.status === 500 || !data) {
            window.alert("Unsuccessful. Some error occured. Did you fill all the details?");
            console.log("Unsuccessful. Some error occured. Did you fill all the details?");
        } else {
            window.alert("Successfully sent the mail to the recipient");
            console.log("Successfully sent the mail to the recipient");
            navigate("/");
        }
    }
    // name, email, domain, gender, hrsignurl, hrname, hrposition, date1, date2
    return (
        <div className="bg-white h-[calc(100vh-2rem)] flex justify-center items-center flex-wrap ">

        <form onSubmit={sendAppointmentLetter} className="w-[20rem]">
            <h1 className="bg-red-700 px-4 w-full py-2 text-white">Appointment Letter</h1>
            <input className="w-full px-2 py-2 bg-slate-100 my-1" onChange={handleChange} placeholder='name' name="name" type="text" value={form.name} />
            <input className="w-full px-2 py-2 bg-slate-100 my-1" onChange={handleChange} placeholder='email' name="email" type="email" value={form.email} />
            <input className="w-full px-2 py-2 bg-slate-100 my-1" onChange={handleChange} placeholder='role' name="role" type="text" value={form.role} />



            <button type="submit" className="bg-red-500 w-full py-2 text-white">Send certificate email</button>
        </form>
        </div>
    )
}

export default Appointment


// name, email, role, hrsignurl, hrname, hrposition
