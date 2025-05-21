"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email?.length > 0 && user?.password?.length > 0) { 
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true); 
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      if (res.status === 200) {
        toast.success("Login successful");
        router.push("/profile");
      }
    } catch (error: any) {
      console.log("Error logging in", error?.message);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white text-2xl">{loading ? 'Processing' : 'Login'}</h1>

      <label htmlFor="email">email</label>
      <input
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        placeholder="password"
      />

      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? 'No Login' : 'Login'}
      </button>

      <Link href="/signup">Visit Sign Up Page</Link>
    </div>
  );
}
