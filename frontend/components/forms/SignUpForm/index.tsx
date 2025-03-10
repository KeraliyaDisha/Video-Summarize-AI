"use client";

import Link from "next/link";
import { registerUserAction } from "@/data/actions/authAction";
import { useActionState } from "react";
import { ZodErrors } from "@/components/global/zodError";
import { StrapiErrors } from "@/components/global/StrapiError";
import { SubmitButton } from "@/components/Button/SubmitButton";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const INITIAL_STATE = {
  data: null,
  ZodErrors: null,
  message: null,
};
export function SignupForm() {
  const [formState, formAction] = useActionState(
    registerUserAction,
    INITIAL_STATE
  );

  console.log(formState, "client");

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
              />
              <ZodErrors error={formState?.ZodError?.username} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
              <ZodErrors error={formState?.ZodError?.email} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
              <ZodErrors error={formState?.ZodError?.password} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <SubmitButton
              className="w-full"
              text="Sign Up"
              loadingText="Loading"
            />
            <StrapiErrors error={formState?.strapiErrors} />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link
            className="text-black hover:text-gray-800 ml-2 font-medium"
            href="signin"
          >
            Sing In
          </Link>
        </div>
      </form>
    </div>
  );
}
