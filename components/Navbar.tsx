"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Bell, Filter, LogOut, Search, SquareUserRound } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { account } from "@/app/appwrite";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("title");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleHome = () => {
    router.push("/");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      router.push(`/search?query=${value}&filter=${filter}`);
    }, 300);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(`/search?query=${query}&filter=${filter}`);
    }
  };

  const handleActive = () => {
    setActive((prevActive) => !prevActive);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    console.log("Filter changed to:", newFilter);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        console.log("Input field focused");
      }
    }, 300);
  };

  useEffect(() => {
    if (active && inputRef.current) {
      inputRef.current.focus();
    }
  }, [active]);

  useEffect(() => {
    const handleScroll = () => {
      const navbarContainer = document.getElementById("navbar");
      const scrollPosition = window.scrollY;

      if (navbarContainer) {
        if (scrollPosition > 0) {
          navbarContainer.style.setProperty("background-color", "#0f172aee");
        } else {
          navbarContainer.style.setProperty("background", "transparent");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    gsap.to("#navbar", {
      y: 0,
      duration: 0.75,
      ease: "back.inOut",
    });
  }, []);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleLogout = async () => {
    localStorage.clear();

    try {
      await account.deleteSession("current");
      console.log("Session deleted successfully");

      router.push("/sign-up");
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={cn(
          "translate-y-[-100%] fixed top-0 left-0 z-[99999] w-full h-auto flex justify-between bg-transparent transition-color duration-300"
        )}
      >
        <div className="ml-[3vw] flex items-center py-[1vw] cursor-pointer">
          <Image
            src="/AnimAceLogo2.svg"
            priority
            alt="logo"
            width={30}
            height={20}
            className="w-[8vw] h-auto mr-[3vw]"
            onClick={handleHome}
          />
          <div className="flex gap-[1.2vw] text-[1vw]">
            <div className="relative group">
              <Link href="/">Home</Link>
              <div className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all ease-in-out duration-300 group-hover:w-full"></div>
            </div>
            <div className="relative group">
              <Link href="/movies">Movies</Link>
              <div className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all ease-in-out duration-300 group-hover:w-full"></div>
            </div>
            <div className="relative group">
              <Link href="/recently-added">Recently Added</Link>
              <div className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all ease-in-out duration-300 group-hover:w-full"></div>
            </div>
            <div className="relative group">
              <Link href="/my-list">My List</Link>
              <div className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all ease-in-out duration-300 group-hover:w-full"></div>
            </div>
          </div>
        </div>
        <div className="mr-[3vw] flex items-center gap-[1.2vw]">
          {active && (
            <div className="flex-center relative">
              <Input
                ref={inputRef}
                value={query}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyPress}
                placeholder={`Search by ${capitalizeFirstLetter(filter)}`}
                type="text"
                className="z-[99999] text-[0.9vw]"
              />
              <div className="absolute cursor-pointer z-[999999] bg-slate-950 flex-center p-[0.5vw] pl-[1vw] mr-[0.5vw] right-0">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Filter className="w-[0.75vw] h-auto" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleFilterChange("title")}
                    >
                      Anime
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleFilterChange("characters")}
                    >
                      Characters
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
          <button className="cursor-not-allowed">
            <Bell className="w-[2vw]" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <SquareUserRound className="w-[2vw] cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link className="cursor-not-allowed" href="/">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
