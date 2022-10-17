const express = require("express");
const deleteUser = require("../controllers/deleteUser");
const getAllUsers = require("../controllers/getAllUsers");
const getRandomUser = require("../controllers/getRandomUser");
const saveUser = require("../controllers/saveUser");
const updateUser = require("../controllers/updateUser");
const findLatestId = require("../utils/findLatestId");

const router = express.Router();

//=================== get random user 
router.get("/random", (req, res) => {
  res.status(200).send(getRandomUser());
});

//=================== get all user 
router.get("/all", (req, res) => {
  const { limit } = req.query;
  const users = getAllUsers(limit);
  res.status(200).send(users);
});

// ================== save ad user
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

// =================== update an user
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


router.patch("/update", (req, res) => {
  const user = req.body;

  if (updateUser(user)) {
    res.status(200).send("user updated");
  }
  else {
    res.status(400).send("please give a information with valid id")
  }
});

// =================== delete an user
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    if (deleteUser(id)) {
      res.status(200).send("user deleted");
    } else {
      res.status(400).send("bad request");
    }
  } else {
    res.status(400).send("Valid User id is required");
  }
});

router.delete("/delete", (req, res) => {
  const { id } = req.body;
  if (id) {
    if (deleteUser(id)) {
      res.status(200).send("user deleted");
    } else {
      res.status(400).send("bad request");
    }
  } else {
    res.status(400).send("Valid User id is required");
  }
});



// ============= bulk update
router.patch("/bulk-update", (req, res) => {
  const bulkUsers = req.body;
  const users = getAllUsers();

  bulkUsers.map(bulkUser => {
    const userExist = users.findIndex((us) => +us.id === +bulkUser.id);
    if (userExist !== -1) {
      if (updateUser(bulkUser)) {
        res.send("user updated");
      }
      else {
        res.send("please give informations with valid id's")
      }
    } else {
      res.send(`${bulkUser.id} is not a valid id`)
    }
  })


});


// router.post("/bulk-update", (req, res) => {
//   const { users } = req.body;
//   console.log(users.users);
//   // expected users = [{ id: 1, name: "name" }, { id: 2, name: "name" }]
//   if (users.length > 0) {
//     users.forEach((user) => {
//       if (updateUser(user) === null) {
//         res.status(400).send("bad request");
//       } else {
//         res.status(200).send("users updated");
//       }
//     });
//   } else {
//     res.status(400).send("bad request");
//   }
// });

module.exports = router;
