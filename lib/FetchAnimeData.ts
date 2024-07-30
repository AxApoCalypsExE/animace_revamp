import { cacheData, getCachedData } from "./localStorageUtils";

export const fetchAniListData = async (query: string) => {
  if (typeof window !== "undefined") {
    const cacheKey = `anilist_${query}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const token = localStorage.getItem("anilist_token");
    const url = "https://graphql.anilist.co";

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ` + token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      cacheData(cacheKey, data);

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  } else {
    const url = "https://graphql.anilist.co";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
};


export const fetchKitsuData = async (title: string) => {
  const cacheKey = `kitsu_${title}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    return cachedData;
  }


  const url = `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(title)}`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    cacheData(cacheKey, data);

    return data;
  } catch (error) {
    console.error("Error fetching data from Kitsu:", error);
    throw error;
  }
};
