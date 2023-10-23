const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "clothings",
  password: "password",
  port: 5432,
});

module.exports = pool;
