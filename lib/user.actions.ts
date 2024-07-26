"use server";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID
} = process.env;

import { createAdminClient } from "./appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "./utils";
import { ID, Query } from "node-appwrite";

interface SignUpProps {
  email: string;
  password: string;
  username: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface GetUserInfoProps {
  userId: string;
}

export const getUserInfo = async ({ userId }: GetUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async ({ email, password, username }: SignUpProps) => {
  console.log("hello")
  let newUserAccount;

  try {
    const { account, database } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newUserAccount) throw new Error("Error making account.");

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        email,
        userId: newUserAccount.$id,
        username,
      }
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async ({ email, password }: SignInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });

    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};
