import conn from "../dbConn/conn.js";

export const getAllPost = () => {
  const query = "SELECT * FROM content";
  return conn.execute(query);
};

export const getPostById = (id) => {
  const query = `SELECT * FROM content WHERE id=${id}`;
  return conn.execute(query);
};

export const getPostByContentId = (content_id) => {
  const query = `SELECT * FROM content WHERE content_id='${content_id}'`;
  return conn.execute(query);
};

export const insertPost = (content_id, media, likes, comment_id, username) => {
  const query = `INSERT INTO content (media, likes, comment_id, content_id, username) VALUES ('${media}', '${likes}', '${comment_id}', '${content_id}', '${username}')`;
  return conn.execute(query);
};
