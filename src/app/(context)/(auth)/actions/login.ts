import Api from "@/shared/api/axios.api";
import { AuthResponse, AuthLogin, User } from "../types/auth.types";
import { ApiInterface } from "@/shared/types/api.type";
import { mapApiAuthResponseToAuthSession } from "../mappers/auth.mapper";

export interface LoginResult {
  user: User;
  accessToken: string;
  headers: Record<string, any>; // para capturar cookies
}

export const login = async (credentials: AuthLogin) => {
  const response = await Api.post<ApiInterface<AuthResponse>>(
    "/auth/login",
    credentials,
    { withCredentials: true }
  );
  const sessionData = mapApiAuthResponseToAuthSession(response.data.data);

  return {
    ...sessionData,
    headers: response.headers,
  };
};
