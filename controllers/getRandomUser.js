const db = "/database/db.json";
const DBPath = require("path").dirname(__dirname).concat(db);
const fs = require("fs");


const getRandomUser = () => {

  const users = JSON.parse(fs.readFileSync(DBPath)).users;
  return users[Math.floor(Math.random() * users.length)];
};
module.exports = getRandomUser;
