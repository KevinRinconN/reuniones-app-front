import { cookies } from "next/headers";
import { login } from "./login";

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { user, token, expires_in, headers } = await login({
    email: email,
    password: password,
  });

  // Capturar refresh_token de la cookie enviada por el backend
  const setCookieHeader = headers["set-cookie"];
  const cookieString = Array.isArray(setCookieHeader)
    ? setCookieHeader.join(";")
    : setCookieHeader;

  const match = cookieString?.match(/refresh_token=([^;]+)/);
  const refreshToken = match?.[1];

  if (refreshToken) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: "refresh_token",
      value: refreshToken,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });
  }

  // Devolver user con accessToken
  return {
    ...user,
    accessToken: token,
    accessTokenExpires: Date.now() + expires_in * 1000,
  };
};
