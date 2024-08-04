"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLoggedInUser } from "@/app/appwrite";

const AniListCallback = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = await getLoggedInUser();
        setUser(loggedInUser);
      } catch (error) {
        console.error("Error fetching logged in user:", error);
      }
    };

    fetchUser();
  }, []);

  const hash = window.location.hash;
  const params = new URLSearchParams(hash.replace("#", "?"));
  const anilistToken = params.get("access_token");

  if (anilistToken && user) {
    localStorage.setItem("anilist_token", anilistToken);
    router.push("/");
  }

  return <div>Loading...</div>;
};

export default AniListCallback;
