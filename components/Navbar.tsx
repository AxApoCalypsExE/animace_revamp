"use client";

import useScrollTop from "@/lib/use-scroll-top";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Bell, Search, SquareUserRound } from "lucide-react";
import Image from "next/image";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  window.addEventListener("scroll", () => {
    const navbarContainer = document.getElementById("navbar");
    const scrollPosition = window.scrollY;

    if (navbarContainer) {
      if (scrollPosition > 0) {
        navbarContainer.style.setProperty("background-color", "#0f172aee")
        window.removeEventListener("scroll", () => {});
      } else {
        navbarContainer.style.setProperty("background", "transparent");
      }
    }
  });

  useGSAP(() => {
    gsap.to("#navbar", {
      y: 0,
      duration: 0.75,
      ease: "back.inOut",
    });
  }, []);

  return (
    <>
      <div className="fade-top" />
      <nav
        id="navbar"
        className={cn(
          "translate-y-[-100%] fixed top-0 left-0 z-[99999] w-full h-auto flex justify-between bg-transparent transition-color duration-300"
        )}
      >
        <div className="ml-[3vw] flex items-center py-[1vw]">
          <Image
            src="/AnimAceLogo2.svg"
            alt="logo"
            width={30}
            height={20}
            className="w-[8vw] h-auto mr-[3vw]"
          />
          <div className="flex gap-[1.2vw] text-[1vw]">
            <a href="/">Home</a>
            <a href="/">Series</a>
            <a href="/">Movies</a>
            <a href="/">Recently Added</a>
            <a href="/">My List</a>
          </div>
        </div>
        <div className="mr-[3vw] flex items-center gap-[1.2vw]">
          <button className="cursor-pointer">
            <Search className="w-[2vw]" />
          </button>
          <button className="cursor-pointer">
            <Bell className="w-[2vw]" />
          </button>
          <button className="">
            <SquareUserRound className="w-[2vw]" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
