require("dotenv").config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;
/**
 * @type { import("knex").Knex.Config }
 */
module.exports = {
  client: "mysql",
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: "",
    password: "",
    database: "ct313h_labs",
  },
  pool: { min: 0, max: 10 },
  seeds: {
    directory: "./seeds",
  },
};
