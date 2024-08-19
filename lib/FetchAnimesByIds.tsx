import { fetchAniListData } from "@/lib/FetchAnimeData";

export async function fetchAnimesByIds(ids: number[]) {
  const query = `
    query {
      Page(perPage: ${ids.length}) {
        media(id_in: [${ids.join(",")}]) {
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
          }
          tags {
            name
          }
          characters(role: MAIN) {
            edges {
              node {
                name {
                  full
                }
              }
            }
          }
        }
      }
    }
  `;
  const result = await fetchAniListData(query);
  return result.data.Page.media;
}
