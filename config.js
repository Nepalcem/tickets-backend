// const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "environment", ".env") });

const { MYSQL_SERVER, MYSQL_USER, MYSQL_DATABASE, MYSQL_PASSWORD } =
  process.env;

const config = {
  db: {
    host: MYSQL_SERVER,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: 3306,
    connectTimeout: 10000,
  },
};
module.exports = config;
