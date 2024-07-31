import Image from "next/image";
import React from "react";
import HeaderBox from "./HeaderBox";

const Hero = () => {
  return (
    <>
      <section className="relative aspect-w-16 aspect-h-8 w-full max-h-[55vw]">
        <div className="aspect-w-16 aspect-h-8 w-full h-full relative">
          <div
            className="bg-cover bg-bottom bg-no-repeat"
            style={{ backgroundImage: 'url("defaultImg.jpg")' }}
          />
          <HeaderBox />
        </div>
      </section>
      <div className="fade-bottom left-0 -bottom-[7vw]" />
    </>
  );
};

export default Hero;
