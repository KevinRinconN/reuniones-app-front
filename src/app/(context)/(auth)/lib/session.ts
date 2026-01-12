import { cookies } from "next/headers";
import { decryptSession, encryptSession, SessionPayload } from "./crypto";

type Session = SessionPayload & {
  refreshToken: string;
};

export async function createSession({ refreshToken, ...payload }: Session) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const encrypted = await encryptSession(payload, expiresAt);

  const cookieStore = await cookies();
  cookieStore.set("session", encrypted, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });

  // 🔄 Refresh token cookie
  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  return decryptSession(token);
}
