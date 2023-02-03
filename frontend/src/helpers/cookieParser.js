import cookie from "cookie";

export function cookieParser(req) {
  return cookie.parse(req ? req.headers.cookie || "" : "");
}
