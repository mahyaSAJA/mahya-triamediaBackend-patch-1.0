import jwt from "jsonwebtoken";

export const verify = (req, res, next) => {
  const auth = req.headers.auth;
  if (!auth) {
    res.status(400).json({ message: "anda belum login" });
  } else {
    const tokenCookie = req.cookies.aksesToken;
    if (!tokenCookie) {
      res.status(400).json({ message: "anda belum login" });
    } else {
      const token = auth.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN, (error, decode) => {
        if (error) {
          res.status(400).json({ message: "something wrong" });
        } else {
          req.email = decode.email;
          next();
        }
      });
    }
  }
};
