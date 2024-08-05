import { Client, Account, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

export const account = new Account(client);
export const databases = new Databases(client);

export { ID } from "appwrite";

export async function getLoggedInUser() {
  try {
    const appUser = await account.get();
    console.log(appUser);
    return appUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}
