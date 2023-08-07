const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");
const express = require("express");

const router = express.Router();

const User = require("../models/user");

router.post("/", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please enter email and password",
      });
    }
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      console.log("User Found");
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role, username: user.username,email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        const { _id, username, email, role} = user;
        res.status(StatusCodes.OK).json({
          token,
          user: { _id, username, email, role},
        });
      } else {
        console.log("Authentication problem");
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Something went wrong!",
        });
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "User does not exist..!",
      });
    }
  } catch (error) {
    console.log("Erooor");
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
});

module.exports = router;
