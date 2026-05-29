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
        },
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
    <div className="flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-blue-950 to-slate-900 p-5 min-h-screen">
      <div className="bg-white/80 backdrop-blur-md w-full max-w-md p-8 rounded-3xl shadow-2xl border border-white/20">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h4 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Create an account
          </h4>
          <p className="text-sm text-slate-500">
            Get started with your free account today
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          {/* Username Input */}
          <div className="flex flex-col mb-2">
            <label
              htmlFor="username"
              className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              placeholder="johndoe"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 bg-slate-50/50 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:outline-none transition-all duration-200 shadow-inner"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col mb-2">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 bg-slate-50/50 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:outline-none transition-all duration-200 shadow-inner"
            />
          </div>

          {/* Phone Input */}
          <div className="flex flex-col mb-2">
            <label
              htmlFor="phone"
              className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 bg-slate-50/50 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:outline-none transition-all duration-200 shadow-inner"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 bg-slate-50/50 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:outline-none transition-all duration-200 shadow-inner"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200 active:scale-[0.99] focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>

        {/* Footer Login Link */}
        <p className="text-sm text-slate-500 text-center mt-3">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-bold hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
