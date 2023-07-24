const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A project must have a name"],
    unique: true,
  },
  category: {
    type: String,
    required: [true, "A project must have a category"],
  },
  description: {
    type: String,
    default: "You currently don't have any further notes on this project.",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
