import Carousel from "@/components/Carousel";
import Hero from "@/components/Hero";
import React from "react";
import AniListLogin from "../(auth)/sign-up/_components/AniListLogin";
import { fetchAniListData, fetchKitsuData } from "@/lib/FetchAnimeData";

const genres = ["action", "romance", "horror", "sports"];

async function fetchCarouselsData() {
  const carouselsData: { [key: string]: any[] } = {};

  for (const genre of genres) {
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
          const kitsuCoverImage = kitsuResult.data[0]?.attributes?.coverImage?.original || "";
          return { ...anime, kitsuCoverImage };
        } catch (error) {
          console.error(`Error fetching Kitsu data for ${title}:`, error);
          return { ...anime, kitsuCoverImage: "" };
        }
      })
    );

    carouselsData[genre] = mediaWithCovers;
  }

  return carouselsData;
};


export default async function Home() {
  const carouselsData = await fetchCarouselsData();

  return (
    <section className="max-xl:max-h-screen">
      <div>
        <Hero />
        <AniListLogin />
        <Carousel genre="action" data={carouselsData["action"]} />
        <Carousel genre="romance" data={carouselsData["romance"]} />
        <Carousel genre="horror" data={carouselsData["horror"]} />
        <Carousel genre="sports" data={carouselsData["sports"]} />
      </div>
    </section>
  );
};