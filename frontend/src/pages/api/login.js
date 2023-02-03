import { API_URL } from "@/configs";
import cookie from "cookie";

export default async function login(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const resExpress = await fetch(`${API_URL}/api/v1/customers/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resExpress.json();
      if (!resExpress.ok) throw { message: data.message, code: resExpress.status };

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ message: data.message });
    } catch (err) {
      res.status(err.code).json({ message: err.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
