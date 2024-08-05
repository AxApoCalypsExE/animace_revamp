"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
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
import { account } from "@/app/appwrite";
import { useRouter } from "next/navigation";
import ClearCacheButton from "@/components/ClearCache";

const authSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const login = async (data: z.infer<typeof authSchema>) => {
    const { email, password } = data;
    try {
      await account.createEmailPasswordSession(email, password);
      router.push("/anilist-signin");
    } catch (error) {
      console.error(error);
      setError("Failed to sign in. Please check your email and password.");
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-24 gap-5">
      <h1>Sign In</h1>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(login)}
          className="flex flex-col gap-5 max-w-sm"
        >
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
            <Button type="submit">Sign In</Button>
            {error && (
              <div className="absolute -bottom-4 text-red-500 left-0 text-[8px]">
                {error}
              </div>
            )}
          </div>
          <p>
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </form>
      </Form>
      <ClearCacheButton />
    </section>
  );
}
