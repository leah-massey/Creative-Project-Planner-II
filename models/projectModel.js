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
  started: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    required: [true, "A project must have a size"],
  },
  difficulty: {
    type: String,
  },
  materialsRequired: {
    type: [String],
  },
  materialsReady: Boolean,
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    default: "You currently don't have any further notes on this project.",
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
