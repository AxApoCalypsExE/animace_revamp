"use client";

export const cacheData = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));

  }
};

export const getCachedData = (key: string) => {
  if (typeof window !== "undefined") {
    const cachedData = localStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }
  return null
};
