import Carousel from "@/components/Carousel";
import Hero from "@/components/Hero";
import React from "react";
import AniListLogin from "../(auth)/sign-up/_components/AniListLogin";

const Home = () => {
  return (
    <section className="max-xl:max-h-screen">
      <div>
        <Hero />
        <AniListLogin />
        <Carousel genre="action" />
        <Carousel genre="romance" />
        <Carousel genre="horror" />
        <Carousel genre="sports" />
      </div>
    </section>
  );
};

export default Home;
