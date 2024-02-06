import mysql from "mysql2/promise";

// Create the connection pool. The pool-specific settings are the defaults
const conn = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "triamedia",
});

export default conn;
