// middleware.ts
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const { _name, value } = req.cookies.get("token");

  if (pathname === "/login" && value) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (pathname === "/register" && value) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
