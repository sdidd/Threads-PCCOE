const mongoose = require("mongoose");
const dotenv = require("dotenv");

// dotenv.config({ path: "./config.env" });
const DB =
  "mongodb+srv://paraskhilosiya20:JQNZ7A3eApTtsVJP@cluster0.28mp73z.mongodb.net/Echat_DB?retryWrites=true&w=majority";

// Middleware
const connectDB = () =>
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => {
      console.log("Connection Successfull");
    })
    .catch((err) => console.log(err));

module.exports = connectDB;
