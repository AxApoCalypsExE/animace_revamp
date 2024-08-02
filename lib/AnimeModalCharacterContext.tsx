"use client";

import React, { createContext, useContext, useState } from "react";

const AnimeModalCharacterContext = createContext(null);

export const useAnimeModalCharacter = () => {
  return useContext(AnimeModalCharacterContext);
};

export const AnimeModalCharacterProvider = ({ children }) => {
  const [modalCharacterData, setModalCharacterData] = useState(null);

  const openCharacterModal = (data) => setModalCharacterData(data);
  const closeCharacterModal = () => setModalCharacterData(null);

  return (
    <AnimeModalCharacterContext.Provider
      value={{ modalCharacterData, openCharacterModal, closeCharacterModal }}
    >
      {children}
    </AnimeModalCharacterContext.Provider>
  );
};
