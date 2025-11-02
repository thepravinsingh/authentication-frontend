"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
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
        }).then(() => {
          router.push("/");
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
   <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
  <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-lg border border-gray-100">
    <h4 className="text-2xl font-semibold text-center text-gray-800 mb-6">Signup</h4>

    {/* Username Input */}
    <div className="flex flex-col mb-4">
      <label
        htmlFor="username"
        className="text-sm font-medium text-gray-700 mb-1"
      >
        Username
      </label>
      <input
        type="text"
        name="username"
        value={data.username}
        onChange={handleChange}
        placeholder="Enter your username"
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    </div>

    {/* Email Input */}
    <div className="flex flex-col mb-4">
      <label
        htmlFor="email"
        className="text-sm font-medium text-gray-700 mb-1"
      >
        Email
      </label>
      <input
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    </div>

    {/* Phone Input */}
    <div className="flex flex-col mb-4">
      <label
        htmlFor="phone"
        className="text-sm font-medium text-gray-700 mb-1"
      >
        Phone
      </label>
      <input
        type="tel"
        name="phone"
        value={data.phone}
        onChange={handleChange}
        placeholder="Enter your phone number"
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    </div>

    {/* Password Input */}
    <div className="flex flex-col mb-4">
      <label
        htmlFor="password"
        className="text-sm font-medium text-gray-700 mb-1"
      >
        Password
      </label>
      <input
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        placeholder="Enter your password"
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    </div>

    {/* Login Link */}
    <p className="text-sm text-gray-600 text-center mb-4">
      Already have an account?{" "}
      <Link href="/login" className="text-blue-600 font-semibold hover:underline">
        Login
      </Link>
    </p>

    {/* Submit Button */}
    <button
      onClick={handleSubmit}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 rounded-lg transition-all duration-200"
    >
      Sign Up
    </button>
  </div>
</div>

  );
}