"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.replace("#", "?")).get(
      "access_token"
    );

    if (token) {
      localStorage.setItem("anilist_token", token);
      router.push("/");
    } else {
      console.error("No token found in URL");
    }
  }, [router]);

  return <div>Loading...</div>;
};

export default AuthRedirect;
