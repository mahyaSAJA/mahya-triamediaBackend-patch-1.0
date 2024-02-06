import conn from "../dbConn/conn.js";

export const register = (email, password, username, content_id) => {
  const query = `INSERT INTO users(email, password, username, content_id, refreshToken) VALUES ('${email}','${password}','${username}','${content_id}', 'null')`;
  return conn.execute(query);
};

export const cekEmail = (email) => {
  const query = `SELECT * FROM users WHERE email= '${email}'`;
  return conn.execute(query);
};

export const getByRefreshToken = (refreshToken) => {
  const query = `SELECT * FROM users WHERE refreshToken= '${refreshToken}'`;
  return conn.execute(query);
};

export const removeRefreshToken = (
  id,
  email,
  password,
  username,
  content_id
) => {
  const query = `UPDATE users SET email='${email}', password='${password}', username='${username}', content_id='${content_id}', refreshToken = 'null' WHERE id=${id}`;
  return conn.execute(query);
};

export const insertRefreshToken = (
  id,
  email,
  password,
  username,
  content_id,
  refreshToken
) => {
  const query = `UPDATE users SET email='${email}', password='${password}', username='${username}', content_id='${content_id}', refreshToken='${refreshToken}' WHERE id= ${id}`;
  return conn.execute(query);
};
