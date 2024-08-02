"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("anilist_token");
  //   if (!token) {
  //     router.push("/sign-up");
  //   }
  // }, [router]);

  return (
    <main>
      <Navbar />
      <div>{children}</div>
    </main>
  );
}
