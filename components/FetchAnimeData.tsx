"use client";

import React, { useEffect, useState } from "react";

export const fetchAniListData = async (query: string) => {
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
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchKitsuData = async (title: string) => {
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
    return data;
  } catch (error) {
    console.error("Error fetching data from Kitsu:", error);
    throw error;
  }
};
