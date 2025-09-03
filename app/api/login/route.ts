// app/api/login/route.ts
import { NextResponse } from "next/server";
import { cookieName, cookieOptions, signSession } from "../../../lib/session";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const okEmail =
    typeof email === "string" &&
    email.toLowerCase() === (process.env.PORTAL_LOGIN_EMAIL || "").toLowerCase();
  const okPass = typeof password === "string" && password === process.env.PORTAL_LOGIN_PASSWORD;

  if (!okEmail || !okPass) {
    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }

  // For the demo, we’ll use the email as the userId.
  const token = signSession(email);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookieName, token, cookieOptions);
  return res;
}
