import React from "react";
import Navbar from "@/components/Navbar";
import { getLoggedInUser } from "../appwrite";
import { redirect } from "next/navigation";
import { UserProvider } from "@/lib/UserContext";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoggedInUser();

  if (!user) redirect("/sign-up");

  redirect("/account");

  return (
      <main>
        <Navbar />
        <div>{children}</div>
      </main>
  );
}
