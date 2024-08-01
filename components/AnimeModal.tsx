import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { gsap } from "gsap";

const AnimeModal = () => {
  const modalRef = useRef(null);
  const modalRefBg = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
    });
  };

  return (
    <div
      ref={modalRefBg}
      className="z-[99999] fixed flex justify-center items-start top-0 left-0 w-full h-full bg-slate-900/95 overflow-auto"
    >
      <div
        ref={modalRef}
        className="w-[50vw] bg-black rounded my-[6vw] overflow-clip"
      >
        <div className="relative">
          <Image
            src={"https://media.kitsu.io/anime/cover_images/4604/original.png"}
            alt="cover"
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
            KonoSuba: God's Blessing on This Wonderful World!
          </h1>
          <div className="fade-bottom bottom-0" />
        </div>
        <div className="px-[2vw] flex gap-x-[3vw] pb-[10vw]">
          <div className="w-[40vw]">
            <div className="text-gray-400 flex justify-between">
              <span>2022</span>
              <span>24 Episodes</span>
              <span>FINISHED</span>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatum eaque, exercitationem ex voluptates aspernatur aliquam
              consectetur tempora perferendis iste porro facere laboriosam quo
              excepturi optio? Pariatur est facilis itaque in.
            </div>
          </div>
          <div className="text-[1vw] gap-y-[5vw]">
            <div>
              <span>Cast: </span>Ace Correa, Patricia Fournell
            </div>
            <div>
              <span>Genres: </span>Genres: Action, Romance
            </div>
            <div>
              <span>Tags: </span>Tags: Pluh
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeModal;
