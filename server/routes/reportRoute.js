const express = require("express");
const Report = require("../models/report");
const router = express.Router();

// Define API endpoints
app.post("/users/:userId/report", async (req, res) => {
  const { userId } = req.params;
  const { reporterId, reason } = req.body;

  try {
    // Find the reporter and reported user
    const [reporter, reportedUser] = await Promise.all([
      User.findById(reporterId),
      User.findById(userId),
    ]);

    if (!reporter || !reportedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new report document
    const report = new Report({
      reporter: reporter._id,
      reportedUser: reportedUser._id,
      reason,
    });
    await report.save();

    res.json({ message: "User reported successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
