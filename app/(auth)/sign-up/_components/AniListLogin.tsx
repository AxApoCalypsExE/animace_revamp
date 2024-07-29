import React from 'react';

const AniListLogin = () => {
  const clientId = '19153';
  // const redirectUri = 'http://127.0.0.1:5500/AnimAce/callback.html';
  const redirectUri = 'http://localhost:3000/auth-redirect';
  const authUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token`;

  return (
    <div>
      <a href={authUrl}>Login with AniList</a>
    </div>
  );
};

export default AniListLogin;