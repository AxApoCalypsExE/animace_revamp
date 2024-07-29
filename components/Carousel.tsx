"use client";

import React, { useEffect, useState } from 'react';
import { fetchAniListData, fetchKitsuData } from './FetchAnimeData';
import Image from 'next/image';


interface Media {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  description: string;
  genres: string[];
  episodes: number;
  duration: number;
  status: string;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  format: string;
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
  };
  kitsuCoverImage?: string;
}


interface CarouselProps {
  genre: string;
}

const Carousel: React.FC<CarouselProps> = ({ genre }) => {
  const [data, setData] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        query {
          Page(perPage: 30) {
            media(genre: "${genre}", sort: POPULARITY_DESC) {
              id
              title {
                romaji
                english
              }
              description
              genres
              episodes
              duration
              status
              startDate {
                year
                month
                day
              }
              format
              coverImage {
                extraLarge
                large
                medium
                color
              }
            }
          }
        }
      `;
      try {
        const result = await fetchAniListData(query);
        const mediaList = result.data.Page.media;

        const mediaWithCovers = await Promise.all(
          mediaList.map(async (anime: Media) => {
            const title = anime.title.english || anime.title.romaji;
            try {
              const kitsuResult = await fetchKitsuData(title);
              const kitsuCoverImage = kitsuResult.data[0]?.attributes?.coverImage?.original || "";
              return { ...anime, kitsuCoverImage };
            } catch (error) {
              console.error(`Error fetching Kitsu data for ${title}:`, error);
              return { ...anime, kitsuCoverImage: "" };
            }
          })
        );

        setData(mediaWithCovers);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genre]);

  return (
    <div>
      <h2>{genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>
      <div className="carousel">
        {loading ? (
          <p>Loading...</p>
        ) : (
          data.map((anime) => (
            <div key={anime.id} className="carousel-item">
              <Image
                src={anime.kitsuCoverImage || anime.coverImage.extraLarge || anime.coverImage.large || anime.coverImage.medium}
                alt={`${anime.title.english || anime.title.romaji} cover`}
                width={390}
                height={554}
                layout="responsive"
              />
              <h3>{anime.title.english || anime.title.romaji}</h3>
              <p>{anime.description}</p>
              <p><strong>Genres:</strong> {anime.genres.join(', ')}</p>
              <p><strong>Episodes:</strong> {anime.episodes}</p>
              <p><strong>Duration:</strong> {anime.duration} minutes</p>
              <p><strong>Status:</strong> {anime.status}</p>
              <p><strong>Start Date:</strong> {anime.startDate.year}-{anime.startDate.month}-{anime.startDate.day}</p>
              <p><strong>Format:</strong> {anime.format}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Carousel;
