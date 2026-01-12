import { ApiInterface } from "@/shared/types/api.type";
import { AuthResponse } from "../types/auth.types";
import Api from "@/shared/api/axios.api";
import { mapApiUserToUser } from "../mappers/auth.mapper";

export const status = async () => {
  const response = await Api.get<
    ApiInterface<Omit<AuthResponse, "access_token">>
  >("/auth/status");
  return mapApiUserToUser(response.data.data.user);
};
