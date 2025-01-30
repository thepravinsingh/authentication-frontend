"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Login() {
  const [storeData, setStoreData] = useState({});
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

  const fetchData = async () => {
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
      console.log(response);
      setStoreData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    fetchData();
  };

  console.log(storeData);

  return (
    <div className="flex flex-col  justify-center items-center h-screen">
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={data.username}
          onChange={handleChange}
          className="border-2 rounded-md text-[0.8rem] "
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="border-2 rounded-md text-[0.8rem] "
        />
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input
          type="number"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          className="border-2 rounded-md text-[0.8rem] "
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          value={data.password}
          onChange={handleChange}
          className="border-2 rounded-md text-[0.8rem] "
        />
      </div>

      <button
        onClick={handleSubmit}
        className="border-2 bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded-lg"
      >
        Submit
      </button>
    </div>
  );
}
