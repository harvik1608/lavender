// config/database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_lavender", "root", "", {
  host: "localhost",      // or your MySQL server/remote host
  dialect: "mysql",
  logging: false          // disable SQL logs in console
});

module.exports = sequelize;
