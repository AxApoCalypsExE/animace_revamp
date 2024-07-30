import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <main>
      <Navbar />
      <div>{children}</div>
    </main>
  );
}
