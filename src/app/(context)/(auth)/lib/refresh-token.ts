import Api from "@/shared/api/axios.api";
import { encryptSession, SessionPayload } from "./crypto";

export async function refreshAccessToken(
  session: SessionPayload,
  refreshToken: string
) {
  try {
    const res = await Api.post(
      "/auth/refresh",
      {},
      {
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
        },
        withCredentials: true,
      }
    );

    const setCookieHeader = res.headers["set-cookie"];
    const cookieString = Array.isArray(setCookieHeader)
      ? setCookieHeader.join(";")
      : setCookieHeader;

    const match = cookieString?.match(/refresh_token=([^;]+)/);
    if (!match) return null;

    const newRefreshToken = match[1];
    const { access_token, expires_in } = res.data.data;

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    return {
      session: await encryptSession(
        {
          ...session,
          accessToken: access_token,
          accessTokenExpires: Date.now() + expires_in * 1000,
        },
        expiresAt
      ),
      refreshToken: newRefreshToken,
      expiresAt,
    };
  } catch {
    return null;
  }
}
