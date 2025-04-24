const sequelize = require("sequelize");
const config = require("../config/config");

const host = config.koneksi_minggu3.DB_HOST;
const user = config.koneksi_minggu3.DB_USER;
const password = config.koneksi_minggu3.DB_PASSWORD;
const database = config.koneksi_minggu3.DB_NAME;
const port = config.koneksi_minggu3.DB_PORT;
const dialect = config.koneksi_minggu3.DB_DIALECT;

const connm3 = new sequelize(database, user, password, {
  host: host,
  dialect: dialect,
  port: port,
});

module.exports = connm3;
