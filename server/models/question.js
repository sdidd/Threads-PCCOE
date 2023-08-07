const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },

  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "userId",
  },
  userName: {
    type: String,
    ref: "userName"
  },
  email:{
    type: String,
    ref: "email"
  },
  tag: {
    type: String,
    required: true,
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
});

module.exports = mongoose.model("Question", questionSchema);
