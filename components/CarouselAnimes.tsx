"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cacheData, getCachedData } from "@/lib/localStorageUtils";
import { fetchAniListData, fetchKitsuData } from "@/lib/FetchAnimeData";
import {
  Carousel as Caro,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PaginationAnime from "./PaginationAnime";
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

interface CarouselProps {
  genre: string;
  data: Media[];
}

const CarouselAnimes: React.FC<CarouselProps> = ({ genre, data }) => {
  const [carouselData, setCarouselData] = useState<Media[]>(data);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = React.useState(0);
  const { openModal } = useAnimeModal();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, current]);

  const fallbackImage = "/path/to/fallback-image.jpg";

  return (
    <div className="my-[6vw] relative max-w-[100vw]">
      <div className="flex justify-between max-w-[97vw] items-center">
        <h2 className="text-[2vw] font-bold ml-[1.5vw] mb-[1.5vw]">
          {genre.charAt(0).toUpperCase() + genre.slice(1)}
        </h2>
        <PaginationAnime counter={current} dataLength={carouselData.length} />
      </div>
      <Caro
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {carouselData.map((anime, index) => (
            <CarouselItem key={index} className="hover:z-[99999] basis-1/7">
              <div
                className="group flex items-end justify-center w-[17vw] h-[23vw] relative transition-transform duration-200 hover:scale-[1.15] cursor-pointer"
                onClick={() => openModal(anime)}
              >
                <Image
                  src={anime.coverImage.extraLarge || anime.kitsuCoverImage || fallbackImage}
                  alt={`${anime.title.english || anime.title.romaji} cover`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
                <h1 className="text-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-slate-900/90 absolute z-[99999] w-full">
                  {anime.title.english || anime.title.romaji}
                </h1>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-[0.5vw]" />
        <CarouselNext className="right-[1.5vw]" />
      </Caro>
    </div>
  );
};

export default CarouselAnimes;
