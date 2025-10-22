"use client";

import SignUpForm, { SignUpFormValues } from "@/components/sign-up-form";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function SignUpPage() {
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = (values: SignUpFormValues) => {
    console.log(values);

    authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
      },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: ({ error }) => {
          alert(`Error occurred while signing up: ${error.message}`);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onRetry: () => {
          setIsPending(true);
          alert("Retrying... Please wait!");
        },
      },
    );
  };

  return (
    <div className="max-w-xl mx-auto">
      <SignUpForm onSubmit={handleSubmit} isPending={isPending} />
    </div>
  );
}
