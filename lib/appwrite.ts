"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = cookies().get("appwrite-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
  const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT!;
  const key = process.env.NEXT_PUBLIC_APPWRITE_KEY!;

  if (!endpoint || !project || !key) {
    throw new Error("Missing necessary environment variables");
  }

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(project)
    .setKey(key);

  return {
    account: new Account(client),
    databases: new Databases(client),
    users: new Users(client),
  };
}
