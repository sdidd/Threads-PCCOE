const { StatusCodes } = require("http-status-codes");

// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const express = require("express");

const User = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);
    if (!username || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please Provide Required Information",
      });
    }

    const hash_password = await bcrypt.hash(password, 10);

    const userData = {
      username,
      email,
      password: hash_password,
    };

    const user = await User.findOne({ email });
    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already registered",
      });
    } else {
      User.create(userData).then((data, err) => {
        if (err) {
          console.log("errorr");
          res.status(StatusCodes.BAD_REQUEST).json({ err });
        } else
          res
            .status(StatusCodes.CREATED)
            .json({ message: "User created Successfully" });
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error while adding answer",
    });
  }
});

module.exports = router;
