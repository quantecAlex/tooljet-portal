// lib/tooljetToken.ts
import jwt from "jsonwebtoken";

export function makeToolJetToken(user: { id: string; email: string; role: string }) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      // add more claims if you want (e.g., region_id)
    },
    process.env.JWT_SECRET!,
    {
      algorithm: "HS256",
      expiresIn: "10m", // short-lived
      issuer: "https://portal.yourdomain.com", // change to your real domain in prod
    }
  );
}
