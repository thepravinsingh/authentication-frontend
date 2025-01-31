"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Signup() {
  const [data, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "You is Registered Successfully",
          icon: "success",
          draggable: true,
        });
      }
      setFormData({
        username: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.mess,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div className="flex flex-col  justify-center items-center h-screen">
      <div className=" flex flex-col justify-between gap-2 p-4 border rounded-md  shadow-md">
        <h4 className="font-semibold text-[1.2rem] self-center">Signup</h4>
        <div className="flex justify-between w-full gap-1 text-[0.8rem] font-medium">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            className="border rounded-md text-[0.8rem] "
          />
        </div>

        <div className="flex justify-between w-full gap-1 text-[0.8rem] font-medium">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="border rounded-md text-[0.8rem] "
          />
        </div>

        <div className="flex justify-between w-full gap-1 text-[0.8rem] font-medium">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            className="border rounded-md text-[0.8rem] "
          />
        </div>

        <div className="flex justify-between w-full gap-1 text-[0.8rem] font-medium">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="border rounded-md text-[0.8rem] "
          />
        </div>

        <p className="text-[0.8rem] font-medium">
          Already register <Link href="/login">login</Link>{" "}
        </p>

        <button
          onClick={handleSubmit}
          className="border-2 bg-blue-500 hover:bg-blue-300 text-white text-[0.8rem] px-4 py-1 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
