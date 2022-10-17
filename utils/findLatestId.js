const getAllUsers = require("../controllers/getAllUsers");

const findLatestId = () => {
  const users = getAllUsers();
  const ids = users.map((item) => item.id);
  return Math.max(...ids);
};
module.exports = findLatestId;
