"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchAniListData } from "@/lib/FetchAnimeData";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Query:", query);
    console.log("Filter:", filter);

    if (query && filter === "characters") {
      const searchQuery = `
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

      console.log("Search Query:", searchQuery);
      fetchAniListData(searchQuery)
        .then((data) => {
          console.log("Fetched Data:", data);
          if (
            data &&
            data.data &&
            data.data.Page &&
            data.data.Page.characters
          ) {
            setSearchResults(data.data.Page.characters);
          } else {
            console.log("No characters found");
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

  return (
    <div className="mt-[7vw] mx-[3vw]">
      <h1 className="my-[1vw]">Search Results for &ldquo;{query}&rdquo; in {filter}</h1>
      <div className="flex flex-wrap gap-x-[3vw] gap-y-[3vw]">
        {loading ? (
          Array.from({ length: 40 }).map((_, index) => (
            <div
              key={index}
              className="w-[10vw] max-md:w-[20vw] bg-slate-800 rounded animate-pulse"
            />
          ))
        ) : (
          searchResults.map((character) => (
            <Card
              className="w-[10vw] max-md:w-[20vw] group relative overflow-hidden text-center rounded"
              key={character.id}
            >
              <CardHeader className="z-20 hidden group-hover:block absolute top-0 left-0 bg-black/35 h-full w-full">
                <CardTitle className="text-wrap text-[1.2vw]">
                  {character.name.full}
                </CardTitle>
                {character.name.native && (
                  <h1 className="text-[1vw] line-clamp-1">
                    ({character.name.native})
                  </h1>
                )}
                <p className="text-[0.8vw] font-bold">
                  -{" "}
                  {character.media.nodes.length > 0 &&
                    (character.media.nodes[0].title.english ||
                      character.media.nodes[0].title.romaji)}
                </p>
              </CardHeader>
              <div className="z-10 w-full h-0 pb-[150%]">
                <Image
                  src={character.image.large}
                  alt={character.name.full}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
