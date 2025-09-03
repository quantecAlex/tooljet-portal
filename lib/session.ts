// lib/session.ts
import jwt from "jsonwebtoken";

const COOKIE_NAME = "sid";
const SESSION_TTL_SECONDS = 12 * 60 * 60; // 12 hours
const ISSUER = "https://portal.local";    // change to your real domain in prod

export function signSession(userId: string) {
  return jwt.sign(
    { sub: userId, typ: "session" },
    process.env.SESSION_SECRET!,
    { algorithm: "HS256", expiresIn: SESSION_TTL_SECONDS, issuer: ISSUER }
  );
}

export function verifySession(token: string) {
  return jwt.verify(token, process.env.SESSION_SECRET!, {
    algorithms: ["HS256"],
    issuer: ISSUER,
  }) as { sub: string };
}

export const cookieName = COOKIE_NAME;
export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  // In dev (http://localhost) cookies can't be "secure".
  // In production (HTTPS) they MUST be secure.
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
