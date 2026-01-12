import { base64url, EncryptJWT, jwtDecrypt } from "jose";
import { User } from "../types/auth.types";

const rawSecret = process.env.SESSION_SECRET;

if (!rawSecret) {
  throw new Error("SESSION_SECRET is missing");
}

const secret = base64url.decode(rawSecret);

export type SessionPayload = {
  user: User;
  accessToken: string;
  accessTokenExpires: number;
};

export async function encryptSession(payload: SessionPayload, expiresAt: Date) {
  return new EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .encrypt(secret);
}

export async function decryptSession(
  token: string
): Promise<SessionPayload | undefined> {
  try {
    const { payload } = await jwtDecrypt(token, secret);
    return payload as SessionPayload;
  } catch {
    console.log("Failed to verify session");
  }
}
