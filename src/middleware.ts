import { NextRequest, NextResponse } from "next/server";
import {
  decryptSession,
  SessionPayload,
} from "./app/(context)/(auth)/lib/crypto";
import { refreshAccessToken } from "./app/(context)/(auth)/lib/refresh-token";

const REDIRECT_AUTH_ROUTE = "/auth/login";

export default async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value;

  if (!sessionCookie) {
    return NextResponse.redirect(new URL(REDIRECT_AUTH_ROUTE, req.url));
  }

  let session: SessionPayload | undefined;

  try {
    session = await decryptSession(sessionCookie);
  } catch {
    return NextResponse.redirect(new URL(REDIRECT_AUTH_ROUTE, req.url));
  }
  if (!session) {
    return NextResponse.redirect(new URL(REDIRECT_AUTH_ROUTE, req.url));
  }

  // ✅ Access token aún válido
  if (Date.now() < session.accessTokenExpires) {
    return NextResponse.next();
  }

  // 🔄 Expiró → refresh
  const refreshToken = req.cookies.get("refresh_token")?.value;
  if (!refreshToken) {
    return NextResponse.redirect(new URL(REDIRECT_AUTH_ROUTE, req.url));
  }

  const refreshed = await refreshAccessToken(session, refreshToken);

  if (!refreshed) {
    return NextResponse.redirect(new URL(REDIRECT_AUTH_ROUTE, req.url));
  }

  // 👇 IMPORTANTE: devolver cookies nuevas desde el middleware
  const res = NextResponse.next();

  res.cookies.set("session", refreshed.session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: refreshed.expiresAt,
    path: "/",
  });

  res.cookies.set("refresh_token", refreshed.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}

// Rutas donde se aplica el middleware
export const config = {
  matcher: ["/admin/:path*"], // protege solo admin
};
