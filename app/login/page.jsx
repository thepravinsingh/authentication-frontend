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
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
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
    <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-blue-950 to-slate-900 px-4">
      <div className="bg-white/80 backdrop-blur-md w-full max-w-md p-8 rounded-3xl shadow-2xl border border-white/20">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h4 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Welcome back
          </h4>
          <p className="text-sm text-slate-500">
            Please enter your details to sign in
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          {/* Email Input */}
          <div className="flex flex-col mb-5">
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
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 bg-slate-50/50 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:outline-none transition-all duration-200 shadow-inner"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col mb-6">
            <div className="flex justify-between items-center mb-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 bg-slate-50/50 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:outline-none transition-all duration-200 shadow-inner"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200 active:scale-[0.99] focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        {/* Footer Signup Link */}
        <p className="text-sm text-slate-500 text-center mt-8">
          Do not have an account yet?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-bold hover:underline underline-offset-4"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
