const fs = require("fs");
const path = require("path");
const getAllUsers = require("./getAllUsers");
const db = "/database/db.json";
const DBPath = path.dirname(__dirname).concat(db);

const saveUser = (user) => {
  const users = getAllUsers();
  users.push(user);
  fs.writeFileSync(DBPath, JSON.stringify({ users }));
  return user;
};
module.exports = saveUser;
