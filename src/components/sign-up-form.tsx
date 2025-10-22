"use client";

import * as React from "react";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const signUpFormSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(40)
    .regex(/[a-zA-Z]/, {
      message: "Name must include characters from a to Z or A to Z",
    }),
  email: z.email({ message: "Please enter a valid Email Address." }),
  password: z
    .string()
    .min(6, { message: "Passowrd must be at least 6 characters long." })
    .max(120, { message: "Passsord cannot exceed 120 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/[0-9]/, { message: "Contain at least one number." }),
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

interface SignUpFormProps {
  onSubmit: (values: SignUpFormValues) => void;
  isPending: boolean;
  redirectUrl?: string | undefined;
}

export default function SignUpForm({ onSubmit, isPending }: SignUpFormProps) {
  const [formData, setFormData] = React.useState<SignUpFormValues>({
    name: "user0001",
    email: "user0001@mail.com",
    password: "#Abc1234567890",
  });

  React.useEffect(() => {
    console.log("Raam Raam Kaake!");
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = signUpFormSchema.safeParse(formData);
    if (!result.success) {
      console.log(result.error);
      alert(result.error);
      return;
    }

    onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-md shadow-md drop-shadow-md drop-shadow-blue-500/30">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your name, email and set a password to sign up and create an
            account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 md:gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <input
                type="text"
                name="name"
                placeholder="naam"
                className="px-3 py-1.5 rounded"
                value={formData.name}
                onChange={handleInput}
                required
                aria-required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <input
                type="email"
                name="email"
                placeholder="test@example.com"
                className="px-3 py-1.5 rounded"
                value={formData.email}
                onChange={handleInput}
                required
                aria-required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <input
                type="password"
                name="password"
                placeholder="******"
                className="px-3 py-1.5 rounded"
                value={formData.password}
                onChange={handleInput}
                required
                aria-required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>

          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 h-px bg-black/30"></div>
            <span className="text-lg">OR</span>
            <div className="flex-1 h-px bg-black/30"></div>
          </div>

          <Button variant={"outline"} className="w-full" disabled={isPending}>
            Continue with Google
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
