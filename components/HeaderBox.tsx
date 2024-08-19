"use client";

import { Info, Play } from "lucide-react";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ClearCacheButton from "./ClearCache";
import { truncateWords } from "@/lib/utils";
import { useAnimeModal } from "@/lib/AnimeModalContext";

interface Media {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  description: string;
  genres: string[];
  episodes: number;
  duration: number;
  status: string;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  format: string;
  coverImage: {
    extraLarge: string;
  };
  kitsuCoverImage?: string;
  tags: { name: string }[];
  characters: { edges: { node: { name: { full: string } } }[] };
}

interface HeaderBoxProps {
  data: Media;
}


const HeaderBox = ({ data }: HeaderBoxProps) => {
  const { openModal } = useAnimeModal();

  useGSAP(() => {
    gsap.to("#headerbox", {
      opacity: 1,
      x: 0,
      duration: 0.75,
      ease: "sine.inOut"
    });

    gsap.to("#header-title", {
      delay: 1,
      opacity: 1,
      scale: 1,
      duration: 0.75,
      ease: "sine.inOut"
    });

    gsap.to("#description", {
      delay: 1,
      opacity: 1,
      duration: 0.75,
      ease: "sine.inOut"
    });
  }, []);

  const description = data.description ? truncateWords(data.description, 30) : "";

  return (
    <div id="headerbox" className="translate-x-[-100px] opacity-0">
      <div id="description" className="absolute bottom-[23%] left-[4%] flex flex-col gap-[0.4vw] py-[1.6vw] px-[2vw] from-slate-500/60 to-slate-800/85 max-w-[36%] rounded-[2.25vw] bg-gradient-to-b">
        <h1 id="header-title" className="pointer-events-none text-[2vw] opacity-0 font-bold text-center scale-50">
          {data.title.english || data.title.romaji}
        </h1>
        <p id="description" className="pointer-events-none opacity-0 text-[1.1vw]">
        {description}
        </p>
        <h3 id="description" className="pointer-events-none opacity-0 text-[1.3vw] mt-[1vw] font-semibold truncateGenre">
          Genre:{" "}
          {data.genres.map((genre, index) => (
            <span key={index} className="py-[0.7vw] px-[0.7vw] text-[1vw] rounded-full glassmorphism mr-[0.3vw]">
              {genre}
            </span>
          ))}
        </h3>
        <div id="description" className="opacity-0 flex-center mt-[1.25vw]">
          <button className="hover:-translate-y-[0.25vw] ease-in transition-transform flex-center bg-white text-[1.5vw] py-[0.5vw] px-[2vw] rounded-[0.5vw] text-slate-950 mr-[2.5vw]">
            <Play className="w-[1.75vw] h-[1.75vw] mr-[0.2vw]" />
            Play
          </button>
          <button 
            onClick={() => (openModal(data))}
            className="hover:-translate-y-[0.25vw] ease-in transition-transform flex-center bg-slate-900/25 text-[1.5vw] py-[0.5vw] px-[2vw] rounded-[0.5vw] text-white">
            <Info className="w-[1.75vw] h-[1.75vw] mr-[0.2vw]" />
            Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBox;
