import { nanoid } from "nanoid";
import { insertPost, getPostByContentId, getAllPost } from "../models/post.js";
import { getByRefreshToken } from "../models/user.js";
import { jwtDecode } from "jwt-decode";

export const createPost = async (req, res) => {
  const { media, likes } = req.body;
  //ambil contentid
  const token = req.cookies.aksesToken;
  if (!token) {
    res.status(400).json({ message: "anda belum login" });
  } else {
    const [userData] = await getByRefreshToken(token);
    const userName = userData[0].username;
    const data = jwtDecode(token);
    const content_id = data.content_id;
    //generate komen id
    const uuid = nanoid();
    try {
      await insertPost(content_id, media, likes, uuid, userName);
      res.status(201).json({ message: "cretaed" });
    } catch (error) {
      res.status(400).json({ msg: error });
    }
  }
};

export const getByUser = async (req, res) => {
  const aksesToken = req.cookies.aksesToken;
  if (!aksesToken) {
    res.status(40).json({ message: "anda belum login" });
  } else {
    const token = jwtDecode(aksesToken);
    const content_id = token.content_id;
    try {
      const [result] = await getPostByContentId(content_id);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: error });
    }
  }
};

export const getAllposts = async (req, res) => {
  const [post] = await getAllPost();
  try {
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};
