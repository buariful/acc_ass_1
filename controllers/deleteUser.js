const fs = require("fs");
const path = require("path");
const getAllUsers = require("./getAllUsers");
const db = "/database/db.json";
const DBPath = path.dirname(__dirname).concat(db);

const deleteUser = (id) => {
    const users = getAllUsers();
    const userExist = users.findIndex((user) => user.id === +id);
    if (userExist !== -1) {
        users.splice(userExist, 1);
        fs.writeFileSync(DBPath, JSON.stringify({ users }));
        return true;
    }
    return false;

}
module.exports = deleteUser;