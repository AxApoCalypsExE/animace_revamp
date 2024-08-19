import React from "react";
import AniListLogin from "../sign-up/_components/AniListLogin";

const AnilistLogin = () => {
  return (
    <div className="max-w-full h-screen flex items-center justify-center flex-col">
      <h1 className="mb-[2vw] text-center text-[2vw] max-md:text-[4vw]">Login to Anilist to use our anime features.</h1>

      <AniListLogin />
    </div>
  );
};

export default AnilistLogin;
