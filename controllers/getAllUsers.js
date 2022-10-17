const fs = require("fs");
const path = require("path");
const db = "/database/db.json";
const DBPath = path.dirname(__dirname).concat(db);
const getAllUsers = (limit = 0) => {
  if (limit > 0) {
    return JSON.parse(fs.readFileSync(DBPath)).users.slice(0, limit);
  } else {
    return JSON.parse(fs.readFileSync(DBPath)).users;
  }
};
module.exports = getAllUsers;
