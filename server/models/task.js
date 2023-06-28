const mongoose = require("mongoose");
const validator = require("validator");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    maxlength: [200, "title should be under 200 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide an description"],
  },
  status: {
    type: String,
    default: "incomplete",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
