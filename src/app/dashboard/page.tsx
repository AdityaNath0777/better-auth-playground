// import { Separator } from "@/components/ui/separator";
import { LogoutButton } from "@/components/logout-button";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

function formatDate(date: Date) {
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-up");
  }

  const { user } = session;

  return (
    <div className="max-w-md min-h-screen mx-auto flex flex-col items-center pt-20 gap-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Raam Raam Authenticated User
      </h2>
      <ul className="space-y-4">
        <li className="mb-2">User Id: {user.id}</li>
        <li>Name: {user.name}</li>
        <li>Username: @{user.username}</li>
        <li>Display User Name: {user.displayUsername}</li>
        <li>Email: {user.email}</li>
        <li>Joined At: {formatDate(user.createdAt)}</li>
      </ul>

      <div className="max-w-sm mx-auto">
        <LogoutButton />
      </div>
    </div>
  );
}
