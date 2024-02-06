import express from "express";
import route from "./route/user.js";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cookieParser());

app.use(express.json());

console.log(nanoid());

app.use("/", route);

app.listen(4000, () => console.log("server jalan uhuy"));
