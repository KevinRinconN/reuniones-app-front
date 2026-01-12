export type ApiUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  roles: string[];
};

export type AuthResponse = {
  user: ApiUser;
  access_token: string;
  expires_in: number;
};

export type RefreshResponse = {
  access_token: string;
  expires_in: number;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: Date | null;
  isActive: boolean;
  roles: string[];
};

export type AuthSession = {
  token: string;
  expires_in: number;
  user: User;
};

export type AuthStatus =
  | "Success"
  | "Invalid credentials"
  | "Pending"
  | "Something went wrong"
  | "Unknown Error";

export interface AuthLogin {
  email: string;
  password: string;
}
