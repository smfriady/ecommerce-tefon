import { cookieParser } from "@/helpers/cookieParser";
import { API_URL } from "@/configs";

export default async function user(req, res) {
  if (req.method === "GET") {
    try {
      if (!req.headers.cookie) throw { name: "NotAuthorized" };
      const { token } = cookieParser(req);

      const resExpress = await fetch(`${API_URL}/api/v1/customers/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userLogin = await resExpress.json();

      if (!resExpress.ok) throw { message: userLogin.message, code: resExpress.status };

      res.status(200).json(userLogin);
    } catch (err) {
      if (err.name === "NotAuthorized") {
        res.status(403).json({ message: "Not Authorized" });
      } else {
        res.status(err.code).json({ message: err.message });
      }
    }

  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
