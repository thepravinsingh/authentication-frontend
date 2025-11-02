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
   <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
  <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-lg border border-gray-100">
    <h4 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h4>

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

    {/* Signup Link */}
    <p className="text-sm text-gray-600 text-center mb-4">
      Don’t have an account?{" "}
      <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
        Sign up
      </Link>
    </p>

    {/* Submit Button */}
    <button
      onClick={handleSubmit}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 rounded-lg transition-all duration-200"
    >
      Login
    </button>
  </div>
</div>

  );
}
