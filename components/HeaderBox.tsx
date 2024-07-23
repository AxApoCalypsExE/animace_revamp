import { Info, Play } from "lucide-react";
import React from "react";

const HeaderBox = () => {
  return (
    <div>
      <div className="absolute bottom-[23%] left-[4%] flex flex-col gap-[0.4vw] py-[1.6vw] px-[2vw] from-slate-500/50 to-slate-800/75 max-w-[36%] rounded-[2.25vw] bg-gradient-to-b">
        <h1 className="text-[2vw] font-bold">Your Name</h1>
        <p className="text-[1.1vw]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quo
          harum repudiandae impedit officia totam doloribus possimus vero vitae
          deserunt? Sed pariatur id nemo minima. Molestias aliquam sit
          praesentium eum!
        </p>
        <h3 className="text-[1.3vw] mt-[1vw] font-semibold">
          Genre: <span className="py-[0.7vw] px-[0.7vw] rounded-full glassmorphism">Action</span>
        </h3>
        <div className="flex-center mt-[1.25vw]">
          <button className="flex-center bg-white text-[1.5vw] py-[0.5vw] px-[2vw] rounded-[0.5vw] text-slate-950 mr-[2.5vw]">
            <Play className="w-[1.75vw] h-[1.75vw] mr-[0.2vw]" />
            Play
          </button>
          <button className="flex-center bg-slate-900/25 text-[1.5vw] py-[0.5vw] px-[2vw] rounded-[0.5vw] text-white">
            <Info className="w-[1.75vw] h-[1.75vw] mr-[0.2vw]" />
            Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBox;
