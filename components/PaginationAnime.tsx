import { cn } from "@/lib/utils";
import React from "react";

interface PaginationAnimeProps {
  counter: number;
  dataLength: number;
}

const PaginationAnime = ({ counter, dataLength }: PaginationAnimeProps) => {
  const multiplier = dataLength / 5;

  return (
    <div className="relative flex items-end justify-center space-x-[0.25vw]">
      <div className={cn(`transition-transform duration-200 w-[1.25vw] h-[0.35vw] content-none bg-white rounded absolute left-0 ml-[0.25vw]`,
        counter >= 5 && counter < 10 && "translate-x-[1.5vw]",
        counter >= 10 && counter < 15 && "translate-x-[3vw]",
        counter >= 15 && counter < 20 && "translate-x-[4.5vw]",
        counter >= 20 && counter < 25 && "translate-x-[6vw]",
        counter >= 25 && counter < 30 && "translate-x-[7.5vw]",
      )}/>
      {Array.from({ length: multiplier }).map((_, index) => (
        <div
          key={index}
          className="w-[1.25vw] h-[0.35vw] content-none bg-purple rounded"
        />
      ))}
    </div>
  );
};

export default PaginationAnime;
