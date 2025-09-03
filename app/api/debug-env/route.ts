import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    sessionSecret: process.env.SESSION_SECRET,
    tooljetUrl: process.env.TOOLJET_APP_URL,
  });
}
