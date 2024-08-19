import { databases } from "@/app/appwrite";
import { Query } from "appwrite";

export async function isAnimeInList(userId: string, id: number): Promise<boolean> {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_ANIMELIST_COLLECTION_ID as string,
      [Query.equal("userId", [userId]), Query.equal("id", [id])]
    );
    return response.documents.length > 0;
  } catch (error) {
    console.error("Error checking anime in list:", error);
    return false;
  }
}
