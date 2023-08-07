const express = require("express");
const Question = require("../models/question");
const User = require("../models/user");
const router = express.Router();

// route for latest question
router.get("/latest-questions", async (req, res) => {
  try {
    const latestQuestions = await Question.find().sort({ creationDate: -1 }); // Sort questions in descending order based on creation date
    // .limit(5); // Limit the result to 5 questions

    res.status(200).json(latestQuestions);
  } catch (error) {
    console.error("Error fetching latest questions:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//  Endpoint for posting a question
router.post("/addque/:userId", async (req, res) => {
  try {
    const { userName, email, content, tag } = req.body;
    const userId = req.params.userId;

    const question = new Question({ content, userId: userId, userName: userName, email: email, tag });

    const savedQuestion = await question.save();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { questions: savedQuestion._id } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(201).json({
      user: updatedUser,
      question: savedQuestion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create question" });
  }
});

// // Endpoint for deleting a question
router.delete("/delque/:userId/:questionId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const questionId = req.params.questionId;

    const deletedQuestion = await Question.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { questions: questionId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Question deleted successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete question" });
  }
});

// Endpoint for updating a question
router.put("/upque/:userId/:questionId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const questionId = req.params.questionId;
    const { content, tag } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { content, tag },
      { new: true }
    ).populate("user", "username");

    if (!updatedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({
      user: updatedQuestion.user,
      question: updatedQuestion,
      message: "updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update question" });
  }
});

// add bookmarked questions for users
router.put("/bookmark/:id/:questionId", async (req, res) => {
  try {
    const userId = req.params.id;
    const questionId = req.params.questionId;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { bookmarked: questionId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(201).json({
      message: "Bookmarked Successfully",
      user: updatedUser,
      question: questionId,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to bookmark question" });
  }
});

router.get("/", (req, res) => {
  res.send("HELLo Question");
});

module.exports = router;
