import { databases } from "@/app/appwrite";
import { Query } from "appwrite";

export async function fetchUserAnimeIds(userId: string) {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_ANIMELIST_COLLECTION_ID as string,
      [Query.equal("userId", [userId])]
    );
    return response.documents.map((doc: any) => doc.id);
  } catch (error) {
    console.error("Error fetching user anime IDs:", error);
    return [];
  }
}
