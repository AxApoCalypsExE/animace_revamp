"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { useAnimeModalCharacter } from "@/lib/AnimeModalCharacterContext";
import { stripHtmlTags } from "@/lib/utils";

const AnimeModalCharacter = () => {
  const modalRef = useRef(null);
  const modalRefBg = useRef(null);
  const { modalCharacterData, closeCharacterModal } = useAnimeModalCharacter();

  useEffect(() => {
    if (modalCharacterData) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [modalCharacterData]);

  const handleClose = () => {
    if (modalRef.current !== null) {
      gsap.to(modalRefBg.current, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          modalRefBg.current.style.display = "none";
        },
      });
    }

    gsap.to(modalRef.current, {
      duration: 0.5,
      opacity: 0,
      scale: 0.5,
      onComplete: closeCharacterModal,
    });
  };

  if (!modalCharacterData) return null;

  return (
    <div
      ref={modalRefBg}
      className="z-[99999] fixed top-0 left-0 w-full h-full bg-slate-900/95 overflow-y-auto flex justify-center items-start"
    >
      <div
        ref={modalRef}
        className="w-[75vw] bg-black rounded mt-[6vw] overflow-auto flex-row flex"
      >
        <div className="relative w-[35vw]">
          <Image
            src={modalCharacterData.image.large}
            alt="cover"
            width={300}
            height={200}
            objectFit="contain"
            className="h-full w-full"
          />
          <X
            className="absolute left-0 top-0 bg-black w-[1.5vw] h-auto rounded-full m-[1vw] cursor-pointer"
            onClick={handleClose}
          />
          <h1 className="m-[1vw] z-10 absolute bottom-[2vw] text-[2vw] left-0">
            {modalCharacterData.name.full} ({modalCharacterData.name.native})
          </h1>
          <div className="fade-bottom bottom-0" />
        </div>
        <div className="px-[2vw] w-[32vw] py-[3vw] space-y-[1vw]">
          <div className="text-slate-400 flex justify-between flex-col gap-y-[1vw]">
            <span>Appears in:</span>
            <span>
              {modalCharacterData.media.nodes
                .map((node) => node.title.english || node.title.romaji)
                .join(", ")}
            </span>
          </div>
          <div className="text-[1.25vw]">
            {stripHtmlTags(modalCharacterData.description)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeModalCharacter;
