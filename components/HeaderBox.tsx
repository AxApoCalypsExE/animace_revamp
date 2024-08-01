"use client";

import { Info, Play } from "lucide-react";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ClearCacheButton from "./ClearCache";
import AniListLogin from "@/app/(auth)/sign-up/_components/AniListLogin";

const HeaderBox = () => {
  useGSAP(() => {
    gsap.to("#headerbox", {
      opacity: 1,
      x: 0,
      duration: 0.75,
      ease: "sine.inOut"
    })

    gsap.to("#header-title", {
      delay: 1,
      opacity: 1,
      scale: 1,
      duration: 0.75,
      ease: "sine.inOut"
    })

    gsap.to("#description", {
      delay: 1,
      opacity: 1,
      duration: 0.75,
      ease: "sine.inOut"
    })
  }, [])

  return (
    <div id="headerbox" className="translate-x-[-100px] opacity-0">
      <div id="description" className="absolute bottom-[23%] left-[4%] flex flex-col gap-[0.4vw] py-[1.6vw] px-[2vw] from-slate-500/50 to-slate-800/75 max-w-[36%] rounded-[2.25vw] bg-gradient-to-b">
        <h1 id="header-title" className="pointer-events-none text-[2vw] opacity-0 font-bold text-center scale-50">Your Name</h1>
        <p id="description" className="pointer-events-none opacity-0 text-[1.1vw]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quo
          harum repudiandae impedit officia totam doloribus possimus vero vitae
          deserunt? Sed pariatur id nemo minima. Molestias aliquam sit
          praesentium eum!
        </p>
        <h3 id="description" className="pointer-events-none opacity-0 text-[1.3vw] mt-[1vw] font-semibold">
          Genre:{" "}
          <span className="py-[0.7vw] px-[0.7vw] rounded-full glassmorphism">
            Action
          </span>
        </h3>
        <div id="description" className="opacity-0 flex-center mt-[1.25vw]">
          <button className="hover:-translate-y-[0.25vw] ease-in transition-transform flex-center bg-white text-[1.5vw] py-[0.5vw] px-[2vw] rounded-[0.5vw] text-slate-950 mr-[2.5vw]">
            <Play className="w-[1.75vw] h-[1.75vw] mr-[0.2vw]" />
            Play
          </button>
          <button className="hover:-translate-y-[0.25vw] ease-in transition-transform flex-center bg-slate-900/25 text-[1.5vw] py-[0.5vw] px-[2vw] rounded-[0.5vw] text-white">
            <Info className="w-[1.75vw] h-[1.75vw] mr-[0.2vw]" />
            Info
          </button>
        <ClearCacheButton />
        <AniListLogin />
        </div>
      </div>
    </div>
  );
};

export default HeaderBox;
