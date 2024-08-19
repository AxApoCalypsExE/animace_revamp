"use client";

import AnimeModal from "@/components/AnimeModal";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimeModalProvider, useAnimeModal } from "@/lib/AnimeModalContext";
import { fetchAnimesByIds } from "@/lib/FetchAnimesByIds";
import { fetchUserAnimeIds } from "@/lib/FetchUserAnimeIds";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MyList = () => {
  const { userId, openModal } = useAnimeModal();
  const [animes, setAnimes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getUserAnimes = async (userId: string) => {
    const animeIds = await fetchUserAnimeIds(userId);
    if (animeIds.length > 0) {
      return await fetchAnimesByIds(animeIds);
    }
    return [];
  };

  useEffect(() => {
    const fetchAnimes = async () => {
      if (userId) {
        const animeList = await getUserAnimes(userId);
        setAnimes(animeList);
        setLoading(false);
      }
    };

    fetchAnimes();
  }, [userId]);

  return (
    <section className="my-[5vw]">
      <div className="mx-[3vw] flex flex-col">
        <div className="flex justify-between">
          <h1>My List</h1>
        </div>
        <div className="grid grid-cols-8 max-lg:grid-cols-4 gap-[1vw] mt-[1vw]">
          {loading
            ? Array.from({ length: 40 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[10vw] h-[18vw] max-lg:w-[20vw] max-lg:h-[36vw] bg-slate-800 rounded animate-pulse"
                />
              ))
            : animes.map((anime) => (
                <Card
                  className="w-[10vw] h-[18vw] max-lg:w-[20vw] max-lg:h-[36vw] group relative overflow-hidden text-center rounded cursor-pointer"
                  key={anime.id}
                  onClick={() => openModal(anime)}
                >
                  <CardHeader className="z-20 hidden group-hover:block absolute top-0 left-0 bg-black/35 h-full w-full">
                    <CardTitle className="text-wrap text-[1.2vw]">
                      {anime.title.english || anime.title.romaji}
                    </CardTitle>
                  </CardHeader>
                  <div className="relative w-full h-full">
                    <Image
                      src={anime.coverImage.extraLarge || anime.kitsuCoverImage}
                      alt={anime.title.english || anime.title.romaji}
                      width={1000}
                      height={1500}
                      className="absolute inset-0 w-full h-full object-cover rounded"
                    />
                  </div>
                </Card>
              ))}
        </div>
      </div>
      <AnimeModal />
    </section>
  );
};

const MyListPage = () => {
  return (
    <AnimeModalProvider>
      <MyList />
    </AnimeModalProvider>
  );
};

export default MyListPage;
