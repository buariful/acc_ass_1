const express = require("express");
require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/user");
// create our express app
const app = express();
const port = process.env.PORT || 3000;
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// route
app.use("/user", routes);
//start server
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.listen(port, () => {
  console.log("listening at port" + port);
});
app.get("*", (req, res) => {
  res.send("not found");
});
