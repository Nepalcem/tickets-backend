const app = require("./app");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "environment", ".env") });

const { MYSQL_SERVER, MYSQL_USER, MYSQL_DATABASE, MYSQL_PASSWORD } =
  process.env;

const connection = mysql.createConnection({
  host: MYSQL_SERVER,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");

  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
});

app.on("error", (err) => {
  console.error(`Server cannot start. Error: ${err.message}`);
  process.exit(1);
});

module.exports = connection;
