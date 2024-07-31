"use client";

import useScrollTop from "@/lib/use-scroll-top";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Bell, Filter, Search, SquareUserRound } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleActive = () => {
    setActive((prevActive) => !prevActive);
    console.log(active);
  };

  useEffect(() => {
    if (active && inputRef.current) {
      inputRef.current.focus();
    }
  }, [active]);

  window.addEventListener("scroll", () => {
    const navbarContainer = document.getElementById("navbar");
    const scrollPosition = window.scrollY;

    if (navbarContainer) {
      if (scrollPosition > 0) {
        navbarContainer.style.setProperty("background-color", "#0f172aee");
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
          {active && (
            <div className="flex-center relative">
              <Input
                ref={inputRef}
                placeholder="Title"
                type="text"
                className="z-[99999] text-[0.9vw]"
              />
              <div className="absolute cursor-pointer z-[999999] bg-slate-950 flex-center p-[0.5vw] pl-[1vw] mr-[0.5vw] right-0">
                <Filter className="w-[0.75vw] h-auto" />
              </div>
              <div
                onClick={handleActive}
                className="z-[9999] w-[100vw] h-[100vh] fixed top-0 left-0 focus"
              />
            </div>
          )}
          <button onClick={handleActive} className="cursor-pointer">
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
