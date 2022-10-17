const fs = require("fs");
const path = require("path");
const db = "/database/db.json";
const DBPath = path.dirname(__dirname).concat(db);
const getAllUsers = require("./getAllUsers");

const updateUser = (user) => {
  const users = getAllUsers();
  const userExist = users.findIndex((us) => +us.id === +user.id);
  if (userExist !== -1) {
    users[userExist] = user;
    fs.writeFileSync(DBPath, JSON.stringify({ users }));
    return user;
  }
  return null;
};
module.exports = updateUser;
