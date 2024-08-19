"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getLoggedInUser } from "../appwrite";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getLoggedInUser();
        if (user) {
          console.log(`User logged in: ${user}`);
          setUser(user);
        } else {
          router.push("/sign-up");
        }
      } catch (error) {
        console.error(error);
        router.push("/sign-up");
      }
    };

    getUser();
  }, [router]);

  if (!user) {
    return (
      <div className="flex-center h-screen">
        <Image
          src="/AnimAceLogo.svg"
          alt="logo"
          width={300}
          height={300}
          className="w-[30vw] animate-scale-pulse"
        />
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      <div>{children}</div>
    </main>
  );
}
