"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchAniListData } from "@/lib/FetchAnimeData";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AnimeModal from "@/components/AnimeModal";

interface Anime {
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
}

interface Character {
  id: number;
  name: {
    full: string;
    native: string;
  };
  image: {
    large: string;
  };
  media: {
    nodes: {
      title: {
        romaji: string;
        english: string;
      };
    }[];
  };
}

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const filter = searchParams.get("filter");
  const [searchResults, setSearchResults] = useState<(Character | Anime)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Query:", query);
    console.log("Filter:", filter);

    let searchQuery = "";
    if (query && filter === "characters") {
      searchQuery = `
        query {
          Page(page: 1, perPage: 40) {
            characters(search: "${query}", sort: [FAVOURITES_DESC]) {
              id
              name {
                full
                native
              }
              description
              image {
                large
              }
              media {
                nodes {
                  title {
                    romaji
                    english
                  }
                }
              }
            }
          }
        }
      `;
    } else if (query && filter === "title") {
      searchQuery = `
        query {
          Page(perPage: 30) {
            media(search: "${query}", type: ANIME, sort: POPULARITY_DESC) {
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
    }

    console.log("Search Query:", searchQuery);
    if (searchQuery) {
      fetchAniListData(searchQuery)
        .then((data) => {
          console.log("Fetched Data:", data);
          if (filter === "characters" && data.data.Page.characters) {
            setSearchResults(data.data.Page.characters);
          } else if (filter === "title" && data.data.Page.media) {
            setSearchResults(data.data.Page.media);
          } else {
            console.log("No results found");
            setSearchResults([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [query, filter]);

  useEffect(() => {
    console.log("Search Results:", searchResults);
  }, [searchResults]);

  const isAnime = (result: Character | Anime): result is Anime => {
    return (result as Anime).title !== undefined;
  };

  return (
    <>
      <div className="mt-[7vw] mx-[3vw]">
        <h1 className="my-[1vw]">
          Search Results for &ldquo;{query}&rdquo; in {filter}
        </h1>
        <div className="flex flex-wrap gap-x-[3vw] gap-y-[3vw]">
          {loading
            ? Array.from({ length: 40 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[10vw] max-md:w-[20vw] bg-slate-800 rounded animate-pulse"
                />
              ))
            : searchResults.map((result) =>
                isAnime(result) ? (
                  <Card
                    className="w-[10vw] max-md:w-[20vw] group relative overflow-hidden text-center rounded"
                    key={result.id}
                  >
                    <CardHeader className="z-20 hidden group-hover:block absolute top-0 left-0 bg-black/35 h-full w-full">
                      <CardTitle className="text-wrap text-[1.2vw]">
                        {result.title.english || result.title.romaji}
                      </CardTitle>
                    </CardHeader>
                    <div className="z-10 w-full h-0 pb-[150%]">
                      <Image
                        src={result.coverImage.extraLarge}
                        alt={result.title.english || result.title.romaji}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                  </Card>
                ) : (
                  <Card
                    className="w-[10vw] max-md:w-[20vw] group relative overflow-hidden text-center rounded"
                    key={result.id}
                  >
                    <CardHeader className="z-20 hidden group-hover:block absolute top-0 left-0 bg-black/35 h-full w-full">
                      <CardTitle className="text-wrap text-[1.2vw]">
                        {result.name.full}
                      </CardTitle>
                      {result.name.native && (
                        <h1 className="text-[1vw] line-clamp-1">
                          ({result.name.native})
                        </h1>
                      )}
                      <p className="text-[0.8vw] font-bold">
                        -{" "}
                        {result.media.nodes.length > 0 &&
                          (result.media.nodes[0].title.english ||
                            result.media.nodes[0].title.romaji)}
                      </p>
                    </CardHeader>
                    <div className="z-10 w-full h-0 pb-[150%]">
                      <Image
                        src={result.image.large}
                        alt={result.name.full}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                  </Card>
                )
              )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
