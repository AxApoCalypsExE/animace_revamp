import { AnimeModalCharacterProvider } from "@/lib/AnimeModalCharacterContext";
import { AnimeModalProvider } from "@/lib/AnimeModalContext";
import React from "react";

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimeModalProvider>
      <AnimeModalCharacterProvider>
        {children}
      </AnimeModalCharacterProvider>
    </AnimeModalProvider>
  );
};

export default SearchLayout;
