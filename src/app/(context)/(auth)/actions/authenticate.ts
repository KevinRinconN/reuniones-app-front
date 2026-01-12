"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { AuthStatus } from "../types/auth.types";
import { login } from "./login";
import { createSession } from "../lib/session";

export async function authenticate(credentials: {
  email: string;
  password: string;
}): Promise<AuthStatus> {
  try {
    const { user, token, expires_in, headers } = await login(credentials);

    const setCookieHeader = headers["set-cookie"];
    const cookieString = Array.isArray(setCookieHeader)
      ? setCookieHeader.join(";")
      : setCookieHeader;

    const match = cookieString?.match(/refresh_token=([^;]+)/);
    const refreshToken = match?.[1];

    if (!refreshToken) {
      return "Invalid credentials";
    }

    await createSession({
      user,
      accessToken: token,
      accessTokenExpires: Date.now() + expires_in * 1000,
      refreshToken,
    });

    return "Success";
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Invalid credentials";
      }
    }

    return "Invalid credentials";
  }
}
