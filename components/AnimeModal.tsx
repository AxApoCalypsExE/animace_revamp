"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle, X } from "lucide-react";
import { gsap } from "gsap";
import { useAnimeModal } from "@/lib/AnimeModalContext";
import { stripHtmlTags } from "@/lib/utils";
import AddAnimeButton from "./AddAnimeList";
import { databases } from "@/app/appwrite";
import { Query } from "appwrite";
import { isAnimeInList } from "@/lib/CheckIfAnimeInList";

const AnimeModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalRefBg = useRef<HTMLDivElement>(null);
  const { modalData, closeModal, userId } = useAnimeModal();
  const [isInList, setIsInList] = useState(false);

  useEffect(() => {
    if (modalData && userId) {
      document.body.style.overflowY = "hidden";

      isAnimeInList(userId, modalData.id).then((inList) => {
        setIsInList(inList);
      });
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [modalData, userId]);

  const handleClose = () => {
    if (modalRefBg.current) {
      gsap.to(modalRefBg.current, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          if (modalRefBg.current) {
            modalRefBg.current.style.display = "none";
          }
        },
      });
    }

    if (modalRef.current) {
      gsap.to(modalRef.current, {
        duration: 0.5,
        opacity: 0,
        scale: 0.5,
        onComplete: closeModal,
      });
    }
  };

  if (!modalData) return null;
  console.log(modalData)

  return (
    <div
      ref={modalRefBg}
      className="z-[99999] fixed top-0 left-0 w-full h-full bg-slate-900/95 overflow-y-auto flex justify-center items-start"
    >
      <div
        ref={modalRef}
        className="w-[50vw] bg-black rounded mt-[6vw] overflow-auto"
      >
        <div className="relative">
          <Image
            src={modalData.kitsuCoverImage || modalData.coverImage.extraLarge}
            alt="cover"
            width={300}
            height={200}
            className="h-full w-full"
          />
          <X
            className="absolute right-0 top-0 bg-black w-[1.5vw] h-auto rounded-full m-[1vw] cursor-pointer"
            onClick={handleClose}
          />
          <h1 className="m-[1vw] z-10 absolute bottom-[2vw] text-[2vw] left-0">
            {modalData.title.english || modalData.title.romaji}
          </h1>
          <div className="fade-bottom bottom-0" />
        </div>
        <div className="px-[2vw] flex gap-x-[4vw] pb-[10vw]">
          <div className="text-[1vw] space-y-[3vw] mt-[2.5vw] max-w-[12vw]">
            <div>
              <span>Genres: </span>
              {modalData.genres.join(", ")}
            </div>
            <div>
              <span>Tags: </span>
              {modalData.tags
                .slice(0, 10)
                .map((tag) => tag.name)
                .join(", ")}
            </div>
            <div>
              <span>Cast: </span>
              {modalData.characters.edges
                .map((edge) => edge.node.name.full)
                .join(", ")}
            </div>
            {!isInList ? (
              <AddAnimeButton />
            ) : (
              <div className="flex items-center">
                <CheckCircle className="w-[2vw] h-auto text-green-500" />
                <span className="ml-[0.5vw]">Added to List</span>
              </div>
            )}
          </div>
          <div className="w-[40vw]">
            <div className="text-gray-400 flex justify-between">
              <span>{modalData.startDate.year}</span>
              <span>{modalData.episodes} Episodes</span>
              <span>{modalData.duration} mins</span>
              <span>{modalData.status}</span>
            </div>
            <div className="text-[1.25vw]">
              {stripHtmlTags(modalData.description)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeModal;
