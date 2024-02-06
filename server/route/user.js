import { signIn, login, signOut, homePage } from "../controller/user.js";
import { createPost, getByUser, getAllposts } from "../controller/post.js";
import { verify } from "../middleware/user.js";
import express from "express";

const route = express.Router();

route.post("/signin", signIn);
route.post("/login", login);
route.delete("/logOut", signOut);
route.get("/", verify, homePage);
route.post("/createPost", verify, createPost);
route.get("/getPostByUser", verify, getByUser);
route.get("/getAllPost", verify, getAllposts);

export default route;
