"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cacheData, getCachedData } from "@/lib/localStorageUtils";
import { fetchAniListData, fetchKitsuData } from "@/lib/FetchAnimeData";

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
}

interface CarouselProps {
  genre: string;
  data: Media[];
}

const Carousel: React.FC<CarouselProps> = ({ genre, data }) => {
  const [carouselData, setCarouselData] = useState<Media[]>(data);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        const cacheKey = `anilist_${genre}`;
        const cachedData = getCachedData(cacheKey);

        if (cachedData) {
          setCarouselData(cachedData);
        } else {
          try {
            const query = `
              query {
                Page(perPage: 30) {
                  media(genre: "${genre}", sort: POPULARITY_DESC) {
                    id
                    title {
                      romaji
                      english
                    }
                    description
                    genres
                    episodes
                    duration
                    status
                    startDate {
                      year
                      month
                      day
                    }
                    format
                    coverImage {
                      extraLarge
                    }
                  }
                }
              }
            `;
            const result = await fetchAniListData(query);
            const mediaList = result.data.Page.media;

            const mediaWithCovers = await Promise.all(
              mediaList.map(async (anime: any) => {
                const title = anime.title.english || anime.title.romaji;
                try {
                  const kitsuResult = await fetchKitsuData(title);
                  const kitsuCoverImage =
                    kitsuResult.data[0]?.attributes?.coverImage?.original || "";
                  return { ...anime, kitsuCoverImage };
                } catch (error) {
                  console.error(
                    `Error fetching Kitsu data for ${title}:`,
                    error
                  );
                  return { ...anime, kitsuCoverImage: "" };
                }
              })
            );

            cacheData(cacheKey, mediaWithCovers);
            setCarouselData(mediaWithCovers);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      }
    };

    fetchData();
  }, [genre]);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>
      <div className="flex overflow-x-auto space-x-4">
        {carouselData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          carouselData.map((anime) => (
            <div
              key={anime.id}
              className="flex-none w-[23vw] h-[32vw] relative"
            >
              <Image
                src={anime.kitsuCoverImage || anime.coverImage.extraLarge}
                alt={`${anime.title.english || anime.title.romaji} cover`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default Carousel;
