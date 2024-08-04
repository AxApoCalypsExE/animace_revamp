"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { account } from "@/app/appwrite";

const ClearCacheButton = () => {
  const router = useRouter();

  const clearCache = async () => {
    localStorage.clear();

    try {
      await account.deleteSession("current");
      console.log("Session deleted successfully");

      router.push("/sign-up");
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <button onClick={clearCache} className="z-[999999]">
      Clear Cache
    </button>
  );
};

export default ClearCacheButton;
