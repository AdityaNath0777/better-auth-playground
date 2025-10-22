import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import Database from "better-sqlite3";
import { generateUniqueUsername } from "./utils";

export const auth = betterAuth({
  database: new Database("sqlite.db"),
  emailAndPassword: {
    enabled: true,
  },

  databaseHooks: {
    user: {
      create: {
        async before(user) {
          const username = await generateUniqueUsername(auth, user.name);

          return {
            data: {
              ...user,
              username,
              displayUsername: user.name,
            },
          };
        },
      },
    },
  },

  plugins: [username(), nextCookies()],
});

export type AuthInstance = typeof auth;
