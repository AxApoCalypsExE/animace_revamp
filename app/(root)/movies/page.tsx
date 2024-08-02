import Hero from "@/components/Hero";
import React from "react";
import { fetchAniListData, fetchKitsuData } from "@/lib/FetchAnimeData";
import CarouselAnimes from "@/components/CarouselAnimes";
import AnimeModal from "@/components/AnimeModal";
import { AnimeModalProvider } from "@/lib/AnimeModalContext";

const genres = ["action", "romance", "horror", "sports"];

async function fetchCarouselsData() {
  const carouselsData: { [key: string]: any[] } = {};

  for (const genre of genres) {
    const query = `
      query {
        Page(perPage: 30) {
          media(genre: "${genre}", sort: POPULARITY_DESC, format_in: MOVIE) {
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
            tags {
              name
            }
            characters(role: MAIN) {
              edges {
                node {
                  name {
                    full
                  }
                }
              }
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
          const kitsuResult = await fetchKitsuData(anime.title.romaji);
          const kitsuCoverImage =
            kitsuResult.data[0]?.attributes?.coverImage?.original || "";
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
}

function getRandomAnime(animeList: any[]) {
  const randomIndex = Math.floor(Math.random() * animeList.length);
  return animeList[randomIndex];
}

export default async function Home() {
  const carouselsData = await fetchCarouselsData();
  const allAnimes = [
    ...carouselsData["action"],
    ...carouselsData["romance"],
    ...carouselsData["horror"],
    ...carouselsData["sports"],
  ];
  const randomAnime = getRandomAnime(allAnimes);

  return (
    <AnimeModalProvider>
      <section className="max-xl:max-h-screen">
        <div className="w-[100vw]">
        <Hero
            data={randomAnime}
          />
          <div className="absolute -translate-y-[17vw] w-[100vw]">
            <CarouselAnimes genre="action" data={carouselsData["action"]} />
            <CarouselAnimes genre="romance" data={carouselsData["romance"]} />
            <CarouselAnimes genre="horror" data={carouselsData["horror"]} />
            <CarouselAnimes genre="sports" data={carouselsData["sports"]} />
          </div>
        </div>
      </section>
      <AnimeModal />
    </AnimeModalProvider>
  );
}
