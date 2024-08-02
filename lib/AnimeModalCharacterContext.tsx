"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AnimeModalCharacterContextType {
  modalCharacterData: any;
  openCharacterModal: (data: any) => void;
  closeCharacterModal: () => void;
}

const AnimeModalCharacterContext = createContext<AnimeModalCharacterContextType | undefined>(undefined);

export const useAnimeModalCharacter = () => {
  const context = useContext(AnimeModalCharacterContext);
  if (context === undefined) {
    throw new Error("useAnimeModalCharacter must be used within an AnimeModalCharacterProvider");
  }
  return context;
};

export const AnimeModalCharacterProvider = ({ children }: { children: ReactNode }) => {
  const [modalCharacterData, setModalCharacterData] = useState<any>(null);

  const openCharacterModal = (data: any) => {
    setModalCharacterData(data);
  };

  const closeCharacterModal = () => {
    setModalCharacterData(null);
  };

  return (
    <AnimeModalCharacterContext.Provider
      value={{ modalCharacterData, openCharacterModal, closeCharacterModal }}
    >
      {children}
    </AnimeModalCharacterContext.Provider>
  );
};
