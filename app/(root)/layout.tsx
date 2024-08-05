"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { getLoggedInUser } from "../appwrite";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getLoggedInUser();
        if (user) {
          console.log(`User logged in: ${user}`);
          router.push("/");
        } else {
          router.push("/sign-up");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, [router]);

  return (
    <main>
      <Navbar />
      <div>{children}</div>
    </main>
  );
}
