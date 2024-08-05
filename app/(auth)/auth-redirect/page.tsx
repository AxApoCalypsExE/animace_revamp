"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLoggedInUser } from "@/app/appwrite";

const AniListCallback = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = await getLoggedInUser();
        if (loggedInUser) {
          const userId = loggedInUser.$id;
          console.log(loggedInUser);
          console.log(userId);

          setUserId(userId);
        } else {
          router.push("/sign-up");

          console.error("Please log in.");
        }
      } catch (error) {
        console.error("Error fetching logged in user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    try {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace("#", "?"));
      const anilistToken = params.get("access_token");
      console.log(userId);

      if (anilistToken && userId) {
        localStorage.setItem("anilist_token", anilistToken);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }, [router, userId]);

  return <div>Loading...</div>;
};

export default AniListCallback;
