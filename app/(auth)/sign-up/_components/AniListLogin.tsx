import React from "react";

const AniListLogin = () => {
  const clientId = "19153";
  // const redirectUri = 'http://127.0.0.1:5500/AnimAce/callback.html';
  const redirectUri = "http://localhost:3000/auth-redirect";
  const authUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token`;

  return (
    <div className="rounded bg-purple py-[1vw] px-[0.25vw] max-md:py-[3vw] max-md:px-[0.75vw]">
      <a className="text-[2vw] max-md:text-[6vw]" href={authUrl}>
        Go to AniList
      </a>
    </div>
  );
};

export default AniListLogin;
