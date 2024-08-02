"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnimeModalCharacterContextType {
  modalCharacterData: any;
  openCharacterModal: (data: any) => void;
  closeCharacterModal: () => void;
}

const AnimeModalCharacterContext = createContext<AnimeModalCharacterContextType | null>(null);

export const useAnimeModalCharacter = () => {
  return useContext(AnimeModalCharacterContext);
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
    <AnimeModalCharacterContext.Provider value={{ modalCharacterData, openCharacterModal, closeCharacterModal }}>
      {children}
    </AnimeModalCharacterContext.Provider>
  );
};
