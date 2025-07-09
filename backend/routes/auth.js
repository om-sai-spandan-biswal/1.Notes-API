const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecrate = process.env.JWT_SECRET_KEY;
const worpAsync = require("../utility/worpAsync");

router.post("/signup", async (req, res) => {
  let userData = req.body;
  const newPass = await bcrypt.hash(userData.password, 10);
  const newUser = { ...userData, password: newPass };
  const creatredUser = await User.create(newUser);
  const token = jwt.sign({ email: newUser["email"] }, jwtSecrate);
  res.cookie("token", token, {
          httpOnly: true,
          secure: true, // required for https like Render
          sameSite: "None", // allows cross-origin cookies
          maxAge: 7 * 24 * 60 * 60 * 1000, // optional, 7 day expiry
        });
  res.status(200).json(creatredUser);
});

router.get("/test", (req, res) => {
  res.send("Router is working");
});

router.post(
  "/login",
  worpAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user != null || undefined) {
      const verifyPass = await bcrypt.compare(password, user["password"]);
      if (verifyPass) {
        const token = jwt.sign({ email: email }, jwtSecrate);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true, // required for https like Render
          sameSite: "None", // allows cross-origin cookies
          maxAge: 7 * 24 * 60 * 60 * 1000, // optional, 7 day expiry
        });

        res.status(200).json({ message: "Successfully Login" });
      } else {
        res
          .status(412)
          .json({ message: "Somthing is Wrong(email or password)" });
      }
    } else {
      res.status(412).json({ message: "Somthing is Wrong(email or password)" });
    }
  })
);

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  });
  res.status(200).json({ message: "successfully logout" });
});

module.exports = router;
