"use client";

import React from "react";
import { databases, ID } from "@/app/appwrite";
import { Permission, Role } from "appwrite";
import { useAnimeModal } from "@/lib/AnimeModalContext";

const AddAnimeButton: React.FC = () => {
  const { modalData, userId } = useAnimeModal();

  const handleAddAnime = async () => {
    if (!userId || !modalData) {
      console.error("User ID or modal data is missing");
      return;
    }

    const id = modalData.id

    const newModalData = {id, userId}

    console.log(newModalData)

    try {
      const response = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_ANIMELIST_COLLECTION_ID as string,
        ID.unique(),
        {
          ...newModalData,
        },
        [
          Permission.read(Role.any()),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );
      console.log("Anime added successfully:", response);
    } catch (error) {
      console.error("Error adding anime:", error);
    }
  };

  return (
    <button onClick={handleAddAnime} disabled={!modalData || !userId}>
      Add Anime to List
    </button>
  );
};

export default AddAnimeButton;
