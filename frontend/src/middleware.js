// middleware.ts
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const { value } = req.cookies.get("token") || false;

  if (pathname === "/login" && value) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (pathname === "/register" && value) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
