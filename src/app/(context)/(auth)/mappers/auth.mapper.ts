import { AuthResponse, ApiUser, AuthSession, User } from "../types/auth.types";

export const mapApiAuthResponseToAuthSession: (
  authResponse: AuthResponse
) => AuthSession = (authResponse) => {
  return {
    token: authResponse.access_token,
    expires_in: authResponse.expires_in,
    user: mapApiUserToUser(authResponse.user),
  };
};

export const mapApiUserToUser: (user: ApiUser) => User = (user) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    emailVerified: null,
    isActive: user.isActive,
    roles: user.roles,
  };
};
