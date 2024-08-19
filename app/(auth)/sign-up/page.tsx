"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { account, databases, getLoggedInUser, ID } from "@/app/appwrite";
import { Models, Permission, Role } from "appwrite";
import { useRouter } from "next/navigation";
import ClearCacheButton from "@/components/ClearCache";
import { createAdminClient } from "@/lib/appwrite";

const authSchema = z.object({
  name: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character",
    }),
});

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [loggedInUser, setLoggedInUser] =
    useState<Models.User<Models.Preferences> | null>(null);

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const login = async (email: string, password: string) => {
    const session = await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    setLoggedInUser(user);

    router.push("/anilist-signin");
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getLoggedInUser();
        if (user) {
          setUserId(user.$id);
        }
      } catch (error) {
        console.error("Error fetching logged-in user:", error);
      }
    };

    getUser();
  }, []);

  const register = async (data: z.infer<typeof authSchema>) => {
    const { name, email, password } = data;
    console.log("Received data:", { name, email, password });

    try {
      const newUser = await account.create(ID.unique(), email, password);
      console.log("New user created:", newUser);

      const userId = newUser.$id;

      const response = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID as string,
        ID.unique(),
        {
          email,
          userId,
        }
      );
      console.log("User added to the database successfully:", response);

      await login(email, password);
    } catch (error) {
      console.error("Registration error:", error);
      setError((error as Error).message);
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-24 gap-5">
      <h1>Sign Up</h1>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(register)}
          className="flex flex-col gap-5 max-w-sm"
        >
          <div className="relative">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      className="pr-8 relative"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {errors.name && (
              <span className="absolute -bottom-4 text-red-500 left-0 text-[8px]">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="relative">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="pr-8 relative"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {errors.email && (
              <span className="absolute -bottom-4 text-red-500 left-0 text-[8px]">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="relative">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      className="pr-8 relative"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {errors.password && (
              <span className="absolute -bottom-4 text-red-500 left-0 text-[8px]">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex gap-5 relative justify-center">
            <Button type="submit">Register</Button>
            {error && (
              <div className="absolute -bottom-5 text-red-500 left-0 text-[7px]">
                {error}
              </div>
            )}
          </div>
          <p>
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-500">
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </section>
  );
}
