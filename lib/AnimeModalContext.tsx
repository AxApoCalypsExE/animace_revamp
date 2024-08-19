"use client";

import { databases, getLoggedInUser, ID } from "@/app/appwrite";
import { Permission, Role } from "appwrite";
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
  userId: string | null;
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
    <AnimeModalContext.Provider value={{ modalData, openModal, closeModal, userId }}>
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
