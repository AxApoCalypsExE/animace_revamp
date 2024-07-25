import Image from "next/image";
import React from "react";
import HeaderBox from "./HeaderBox";

const Hero = () => {
  return (
    <section className="relative aspect-w-16 aspect-h-8 w-full">
      <div className="aspect-w-16 aspect-h-8 w-full h-full">
        <div
          className="bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: 'url("defaultImg.jpg")' }}
        />
        <HeaderBox />
      </div>
    </section>
  );
};

export default Hero;
