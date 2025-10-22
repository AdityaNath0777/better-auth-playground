import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 max-w-7xl pt-10">
      <h1 className="text-3xl font-medium tracking-tight text-center">
        Home page
      </h1>

      <div className="mx-auto max-w-xl mt-10">
        <ul className="flex flex-col items-stretch gap-2">
          <li className="">
            <Button
              variant={"link"}
              className="ring-1 ring-accent-foreground/40 w-full"
              asChild
            >
              <Link href={"/sign-up"}>Sign Up</Link>
            </Button>
          </li>
          <li className="">
            <Button
              variant={"link"}
              className="ring-1 ring-accent-foreground/40 w-full"
              asChild
            >
              <Link href={"/log-in"}>Log In</Link>
            </Button>
          </li>
        </ul>
      </div>

      <div className="max-w-sm mx-auto">
        <LogoutButton />
      </div>
    </div>
  );
}
