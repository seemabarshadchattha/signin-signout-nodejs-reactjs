const Sequelize = require("sequelize");
const db = require("../config/db");

const Users = db.define("Users", {
  userid: { type: Sequelize.STRING(225) },
  apikey: { type: Sequelize.STRING(225) },
  firstname: { type: Sequelize.STRING(225) },
  lastname: { type: Sequelize.STRING(225) },
  email: { type: Sequelize.STRING(225) },
  password: { type: Sequelize.STRING },
  created_On: { type: Sequelize.DATE, defaultValue: new Date() }
});

module.exports = Users;
