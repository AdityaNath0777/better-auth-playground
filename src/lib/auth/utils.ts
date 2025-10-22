import { APIError } from "better-auth";
import type { AuthInstance } from "./server";

export async function generateUniqueUsername(
  authInstance: AuthInstance,
  name: string = "user",
): Promise<string | null> {
  const baseName = name
    .split(" ")[0]
    .toLowerCase()
    .replace(/[^a-zA-Z0-9_]/g, "")
    .slice(0, 10);

  let retry = 5;
  while (retry) {
    const username = `${baseName}_${crypto.randomUUID().slice(0, 7)}`;

    try {
      const { available } = await authInstance.api.isUsernameAvailable({
        body: { username },
      });
      if (available) return username;
    } catch {
      throw new APIError("INTERNAL_SERVER_ERROR", {
        message: "Failed to generate username",
      });
    }

    retry--;
  }

  return null;
}
