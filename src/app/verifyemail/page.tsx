"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      if (response.status === 200) {
        setVerified(true);
      }
    } catch (error: any) {
      setError(true);
      console.error(
        "Error verifying email:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("token=")[1];
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  useEffect(() => {
    if (token?.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No Token"}
      </h2>

      {verified && (
        <div>
          <div className="text-2xl">Email Verified</div>
          <Link href="/login" className="text-blue-500 underline">
            Go to Login
          </Link>
        </div>
      )}

      {error && (
        <div>
          <div className="text-2xl bg-red-500 text-black">Error</div>
        </div>
      )}
    </div>
  );
}
