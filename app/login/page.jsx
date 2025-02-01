"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
export default function Login() {
  const router = useRouter();

  const [data, setFormData] = useState({
    email: "",
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
        "http://localhost:4000/api/auth/login",
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
          title: "You Are Login Successfully",
          icon: "success",
          draggable: true,
        }).then(() => {
          router.push("/");
        });
      }

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div className="flex flex-col  justify-center items-center h-screen">
      <div className=" flex flex-col justify-between gap-2 p-4 border rounded-md  shadow-md">
        <h4 className="font-semibold text-[1.2rem] self-center">Login</h4>
        <div className="flex justify-between w-full gap-1 text-[0.8rem] font-medium">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="border rounded-md text-[0.8rem] py-0.5 px-2"
          />
        </div>
        <div className="flex justify-between w-full gap-1 text-[0.8rem] font-medium">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="border rounded-md text-[0.8rem] py-0.5 px-2"
          />
        </div>

        <p className="text-[0.8rem] font-medium">
          Don't have an account?{" "}
          <Link href="/signup" className="font-semibold">
            signup
          </Link>
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
