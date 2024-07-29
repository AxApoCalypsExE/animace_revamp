import type { Metadata } from "next";
import { Raleway  } from "next/font/google";
import "./globals.css";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });

export const metadata: Metadata = {
  title: "AnimAce",
  description: "The modern anime list website.",
  icons: {
    icon: "/AnimAceLogo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable}`}>
        {children}
      </body>
    </html>
  );
}

