import {
  cekEmail,
  register,
  insertRefreshToken,
  getByRefreshToken,
  removeRefreshToken,
} from "../models/user.js";
import argon2 from "argon2";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  const { email, password, username, confPass } = req.body;
  //cek email di database
  const [emailResult] = await cekEmail(email);
  if (emailResult.length > 0) {
    res.status(400).json({ message: "email telah digunakan" });
  } else {
    //cek password
    if (password !== confPass) {
      res.status(400).json({ message: "password tidak valid" });
    } else {
      //hash password
      const hashPass = await argon2.hash(password);
      //buat content_id
      const uuid = nanoid();
      //masukkan ke database
      try {
        await register(email, hashPass, username, uuid);
        res.status(201).json({ message: "created" });
      } catch (error) {
        res.status(400).json({ msg: error });
      }
    }
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  //cek email
  const [emailResult] = await cekEmail(email);
  if (emailResult.length > 0) {
    const id = emailResult[0].id;
    const emaill = emailResult[0].email;
    const passwordd = emailResult[0].password;
    const username = emailResult[0].username;
    const content_id = emailResult[0].content_id;
    //cek password
    const verify = await argon2.verify(passwordd, password);
    //cek password
    if (verify) {
      //create jwt token
      const aksesToken = jwt.sign(
        {
          id,
          emaill,
          username,
          content_id,
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "1d",
        }
      );
      //create cookie
      res.cookie("aksesToken", aksesToken, {
        origin: "http://localhost:5173",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      //insert refreshToken
      try {
        await insertRefreshToken(
          id,
          emaill,
          passwordd,
          username,
          content_id,
          aksesToken
        );
        res.status(200).json({ aksesToken });
      } catch (error) {
        res.status(400).json({ msg: error });
      }
    } else {
      res.status(400).json({ message: "password salah" });
    }
  } else {
    res.status(400).json({ message: "email tidak ditemukan" });
  }
};

export const signOut = async (req, res) => {
  const aksesToken = req.cookies.aksesToken;
  if (!aksesToken) {
    res.status(400).json({ message: "anda belum login" });
  } else {
    const [data] = await getByRefreshToken(aksesToken);
    if (data.length > 0) {
      const id = data[0].id;
      const email = data[0].email;
      const password = data[0].password;
      const username = data[0].username;
      const content_id = data[0].content_id;

      try {
        await removeRefreshToken(id, email, password, username, content_id);
        //hapus cookies
        res.clearCookie("aksesToken");
        res.status(200).json({ message: "anda telah logout" });
      } catch (error) {
        res.status(400).json({ msg: error });
      }
    }
  }
};

//tes middleware
export const homePage = (req, res) => {
  res.json({ message: "selamat datang" });
};
