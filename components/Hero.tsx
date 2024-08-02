import Image from "next/image";
import React from "react";
import HeaderBox from "./HeaderBox";

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

interface HeroProps {
  data: Media;
}


const Hero = ({ data }: HeroProps) => {
  return (
    <>
    <div className="fade-top top-0 left-0" />
      <section className="relative aspect-w-16 aspect-h-8 w-full max-h-[55vw]">
        <div className="aspect-w-16 aspect-h-8 w-full h-full relative">
          <div
            className="bg-cover bg-top bg-no-repeat"
            style={{ backgroundImage: `url(${data.kitsuCoverImage || data.coverImage.extraLarge})` }}
          />
          <HeaderBox data={data} />
        </div>
      </section>
      <div className="fade-bottom left-0 -bottom-[7vw]" />
    </>
  );
};

export default Hero;
