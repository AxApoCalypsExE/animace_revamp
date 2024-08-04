import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import React from "react";

const MyList = () => {
  return (
    <section className="my-[5vw]">
      <div className="mx-[3vw] flex flex-col">
        <div className="flex justify-between">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-x-[1vw]">
                <Filter className="w-[0.75vw] h-auto" />
                <h1>Filter</h1>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Title</DropdownMenuItem>
                <DropdownMenuItem>Characters</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <h1>My List</h1>
          <div />
        </div>
        <div className="grid grid-cols-8 gap-4 mt-4">
          {Array.from({ length: 40 }).map((_, index) => (
            <div
              key={index}
              className="w-[10vw] h-[18vw] max-md:w-[20vw] bg-slate-800 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyList;
