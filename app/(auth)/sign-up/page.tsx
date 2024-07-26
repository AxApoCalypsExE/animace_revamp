"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppwriteException } from "appwrite";
import { Eye, EyeOff, Mail, User } from "lucide-react";
import { signUp } from "@/lib/user.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const authSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
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

  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;


  const onSubmit = async (data: z.infer<typeof authSchema>) => {
    console.log(data)
    try {
      setError(null);

      const newUser = await signUp(data);

      if (!newUser) {
        console.log("Trouble making user");
      }

      if (newUser) {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof AppwriteException) {
        if (error.code === 409) {
          setError(
            "This email is already in use. Please try another email in."
          );
        } else {
          setError(error.message);
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
      console.log(error);
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-24 gap-5">
      <h1>Sign Up</h1>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 max-w-sm"
        >
          <FormField
            control={form.control}
            name="username"
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
          {errors.username && (
            <span className="absolute -bottom-4 text-red-500 left-0 text-[8px]">
              {errors.username.message}
            </span>
          )}
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
                    type="password"
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
          <div className="flex gap-5 relative justify-center">
            <Button type="submit">Register</Button>
            {error && (
              <div className="absolute -bottom-4 text-red-500 left-0 text-[8px]">
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

{/* <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 max-w-sm"
      >
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="pr-8 relative"
          />
          <User className="text-muted-foreground absolute inset-y-0 right-0.5 leading-5 pr-[0.125rem]" />
          {errors.email && (
            <span className="absolute -bottom-4 text-red-500 left-0 text-[8px]">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="relative w-full">
          <input
            type="email"
            placeholder="Email"
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
            placeholder="Password"
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
      </form> */}
