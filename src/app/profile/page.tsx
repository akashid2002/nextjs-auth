"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = React.useState<object | null>(null);

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Error logging out", error?.message);
      toast.error(error?.message);
    } finally { 
    }
  }

  const getUserDetail = async () => {
    try {
      const {data} = await axios.get("/api/users/me");
      setUser(data?.user);
      toast.success("User fetched successfully");
    } catch (error: any) {
      console.log("Error fetching user details", error?.message);
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    getUserDetail()
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white text-2xl">Profile Page</h1>

      <button
        className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
      <button
        className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        // onClick={getUserDetail}
      >
        {user?.username}
      </button>
    </div>
  );
}
