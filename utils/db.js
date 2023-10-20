const mysql = require("mysql2/promise");
const config = require("../config");

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
    const sanitizedParams = params.map((param) =>
      param !== undefined ? param : null
    );

  const [results] = await connection.execute(sql, sanitizedParams);

  connection.end();
  return results;
}

module.exports = {
  query,
};
