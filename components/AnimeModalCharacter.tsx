"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { useAnimeModalCharacter } from "@/lib/AnimeModalCharacterContext";
import { stripHtmlTags } from "@/lib/utils";

const AnimeModalCharacter = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalRefBg = useRef<HTMLDivElement>(null);
  const { modalCharacterData, closeCharacterModal } = useAnimeModalCharacter();

  useEffect(() => {
    if (modalCharacterData) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [modalCharacterData]);

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
        onComplete: closeCharacterModal,
      });
    }
  };

  if (!modalCharacterData) return null;

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
            src={modalCharacterData.image.large}
            alt={modalCharacterData.name.full}
            width={300}
            height={200}
            objectFit="contain"
            className="h-full w-full"
          />
          <X
            className="absolute right-0 top-0 bg-black w-[1.5vw] h-auto rounded-full m-[1vw] cursor-pointer"
            onClick={handleClose}
          />
          <h1 className="m-[1vw] z-10 absolute bottom-[2vw] text-[2vw] left-0">
            {modalCharacterData.name.full}
          </h1>
          <div className="fade-bottom bottom-0" />
        </div>
        <div className="px-[2vw] flex gap-x-[4vw] pb-[10vw]">
          <div className="text-[1vw] space-y-[3vw] mt-[2.5vw] max-w-[12vw]">
            <div>
              <span>Native Name: </span>
              {modalCharacterData.name.native}
            </div>
            <div>
              <span>Media: </span>
              {modalCharacterData.media.nodes
                .map((node: any) => node.title.romaji || node.title.english)
                .join(", ")}
            </div>
          </div>
          <div className="w-[40vw]">
            <div className="text-gray-400 flex justify-between">
              <span>Description</span>
            </div>
            <div className="text-[1.25vw]">{stripHtmlTags(modalCharacterData.description)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeModalCharacter;
