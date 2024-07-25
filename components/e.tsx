"use client";

import { account } from "@/app/appwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { AppwriteException, Models } from "appwrite";
import { Eye, EyeOff, Mail } from "lucide-react";
import { createAdminClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { getUserInfo } from "@/lib/contexts/UserContext";
import { parseStringify } from "@/lib/utils";

type SchemaType = z.infer<typeof schema>;

const schema = z.object({
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

export default function SignIn() {
  // const [user, setUser] = useState<null | UserType>(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SchemaType> = async ({ password, email }) => {
    setLoading(true);
    try {
      setError(null);
      const { account } = await createAdminClient();
      const session = await account.createEmailPasswordSession(email, password);

      cookies().set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });

      const user = await getUserInfo({ userId: session.userId });
      setLoading(false);

      return parseStringify(user);
    } catch (error) {
      if (error instanceof AppwriteException) {
        if (error.code === 401) {
          setError("Invalid credentials. Please check the email and password.");
        } else {
          setError(error.message);
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-24 gap-5">
      <h1>Sign In</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 max-w-sm"
      >
        <div className="relative w-full">
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="pr-8 relative"
          />
          <Mail className="text-muted-foreground absolute inset-y-0 right-0.5 leading-5 pr-1" />
          {errors.email && (
            <span className="absolute -bottom-4 text-red-500 left-0 text-[8px]">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
            className="pr-8 relative"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-1 flex items-center text-muted-foreground text-sm leading-5"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
          {errors.password && (
            <span className="absolute -bottom-4 text-red-500 left-0 text-[8px]">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex gap-5 relative justify-center">
          <button type="submit">Login</button>
          {error && (
            <div className="absolute -bottom-4 text-red-500 left-0 text-[8px]">
              {error}
            </div>
          )}
        </div>
      </form>
      <p>
        Don&apos;t have an account with us?{" "}
        <Link href="/sign-up" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </section>
  );
}


return (
  <section className="flex min-h-screen flex-col items-center justify-center p-24 gap-5">
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-sm">
      <div className="relative w-full">
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="pr-8 relative"
        />
        <Mail className="text-muted-foreground absolute inset-y-0 right-0.5 leading-5 pr-1" />
        {errors.email && (
          <span className="absolute -bottom-4 text-red-500 left-0 text-[8px]">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          {...register("password")}
          className="pr-8 relative"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-1 flex items-center text-muted-foreground text-sm leading-5"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
        {errors.password && (
          <span className="absolute -bottom-4 text-red-500 left-0 text-[8px]">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="flex gap-5 relative justify-center">
        <button type="submit">Register</button>
        {error && (
          <div className="absolute -bottom-4 text-red-500 left-0 text-[8px]">
            {error}
          </div>
        )}
      </div>
    </form>
    <p>
      Already have an account?{" "}
      <Link href="/sign-in" className="text-blue-500">
        Sign in
      </Link>
    </p>
  </section>
);
}