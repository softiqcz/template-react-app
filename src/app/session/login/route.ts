import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as {
    email?: string;
    token?: string;
  } | null;

  if (!body?.email || !body.token) {
    return NextResponse.json(
      { message: "Chybí přihlašovací údaje." },
      { status: 400 },
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(
    "user_info",
    JSON.stringify({ email: body.email, token: body.token }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400,
    },
  );
  return response;
}
