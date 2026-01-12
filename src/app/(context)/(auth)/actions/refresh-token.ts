import axios from "axios";
import { cookies } from "next/headers";
import { RefreshResponse } from "../types/auth.types";
import { ApiInterface } from "@/shared/types/api.type";

export const refreshToken = async () => {
  const plainAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    withCredentials: true,
  });

  // SSR: obtener cookie
  const cookieStore =
    typeof window === "undefined" ? await cookies() : undefined;
  const refreshTokenValue = cookieStore?.get("refresh_token")?.value;

  const response = await plainAxios.post<ApiInterface<RefreshResponse>>(
    "/auth/refresh",
    {},
    {
      withCredentials: true,
      headers:
        typeof window === "undefined"
          ? { Cookie: `refresh_token=${refreshTokenValue}` }
          : undefined,
    }
  );

  return {
    accessToken: response.data.data.access_token,
    headers: response.headers,
  };
};
