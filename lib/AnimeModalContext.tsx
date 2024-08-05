"use client";

import { account, getLoggedInUser } from "@/app/appwrite";
import React, { createContext, useContext, useEffect, useState } from "react";

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

interface AnimeModalContextType {
  modalData: Media | null;
  openModal: (data: Media) => void;
  closeModal: () => void;
}

const AnimeModalContext = createContext<AnimeModalContextType | undefined>(
  undefined
);

export const AnimeModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalData, setModalData] = useState<Media | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getLoggedInUser();
        if (user) {
          setUserId(user.$id);
        }
      } catch (error) {
        console.error("Error fetching logged-in user:", error);
      }
    };

    getUser();
  }, []);

  const openModal = (data: Media) => setModalData(data);
  const closeModal = () => setModalData(null);

  return (
    <AnimeModalContext.Provider value={{ modalData, openModal, closeModal }}>
      {children}
    </AnimeModalContext.Provider>
  );
};

export const useAnimeModal = () => {
  const context = useContext(AnimeModalContext);
  if (context === undefined) {
    throw new Error("useAnimeModal must be used within an AnimeModalProvider");
  }
  return context;
};

// {
//   "userId": "userId123",
//   "animeId": "animeId123",
// "title": "Anime Title",
// "coverImage": "https://link-to-cover-image.com",
// "description": "This is an anime description.",
// "genres": ["Action", "Adventure"],
// "tags": ["Tag1", "Tag2"],
// "characters": ["Character1", "Character2"],
// "startDate": "2024-01-01",
// "episodes": 24,
// "duration": 24,
// "status": "Finished"
// format
// kitsuCoverImage
// }
