const express = require("express");
const deleteUser = require("../controllers/deleteUser");
const getAllUsers = require("../controllers/getAllUsers");
const getRandomUser = require("../controllers/getRandomUser");
const saveUser = require("../controllers/saveUser");
const updateUser = require("../controllers/updateUser");
const findLatestId = require("../utils/findLatestId");

const router = express.Router();

router.get("/random", (req, res) => {
  res.status(200).send(getRandomUser());
});
router.get("/all", (req, res) => {
  const { limit } = req.query;
  const users = getAllUsers(limit);
  res.status(200).send(users);
});
router.post("/save", async (req, res) => {
  const { gender, name, contact, address, photoUrl } = req.body;
  if (gender && name && contact && address && photoUrl) {
    const user = {
      id: findLatestId() + 1,
      gender,
      name,
      contact,
      address,
      photoUrl,
    };
    await saveUser(user);
    res.status(201).send("user saved");
  } else {
    res.status(400).send("bad request");
  }
});
router.patch("/update/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (id) {
    const newUser = { id: Number(id) };
    for (const key in user) {
      if (Object.hasOwnProperty.call(user, key)) {
        newUser[key] = user[key];
      }
    }
    if (updateUser(newUser) === null) {
      res.status(400).send("bad request");
    } else {
      res.status(200).send(updateUser(newUser));
    }
  } else {
    res.status(400).send("User id is required");
  }
});
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    if (deleteUser(id)) {
      res.status(200).send("user deleted");
    } else {
      res.status(400).send("bad request");
    }
  } else {
    res.status(400).send("User id is required");
  }
});
router.post("/bulk-update", (req, res) => {
  const { users } = req.body;
  console.log(users.users);
  // expected users = [{ id: 1, name: "name" }, { id: 2, name: "name" }]
  if (users.length > 0) {
    users.forEach((user) => {
      if (updateUser(user) === null) {
        res.status(400).send("bad request");
      } else {
        res.status(200).send("users updated");
      }
    });
  } else {
    res.status(400).send("bad request");
  }
});

module.exports = router;
