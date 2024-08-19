"use client";

import React, { useState } from "react";
import { databases, ID } from "@/app/appwrite";
import { Permission, Role } from "appwrite";
import { useAnimeModal } from "@/lib/AnimeModalContext";
import { CheckCircle, Loader2 } from "lucide-react"; // Import icons

const AddAnimeButton: React.FC = () => {
  const { modalData, userId } = useAnimeModal();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddAnime = async () => {
    if (!userId || !modalData) {
      console.error("User ID or modal data is missing");
      return;
    }

    setIsLoading(true);

    const id = modalData.id;

    try {
      const response = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_ANIMELIST_COLLECTION_ID as string,
        ID.unique(),
        {
          id,
          userId,
        },
        [
          Permission.read(Role.any()),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );

      setIsLoading(false);
      setIsAdded(true);
    } catch (error) {
      console.error("Error adding anime:", error);
      setIsLoading(false);
    }
  };

  if (isAdded) {
    return (
      <div className="flex items-center">
        <CheckCircle className="w-[2vw] h-auto text-green-500" />
        <span className="ml-[0.5vw]">Added to List</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleAddAnime}
      disabled={!modalData || !userId || isLoading}
      className="rounded py-[1vw] w-[9vw] px-[0.25vw] bg-purple hover:translate-y-[-0.25vw] transition-transform ease-in-out flex-center"
    >
      {isLoading ? (
        <Loader2 className="w-[2vw] h-auto animate-spin" />
      ) : (
        "Add Anime to List"
      )}
    </button>
  );
};

export default AddAnimeButton;
