const fs = require("fs");
const Project = require("../models/projectModel");

//👇🏻 how we were originally importing the data from a json file.
// const projects = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/projects.json`)
// );

// 👇🏻 we no longer need this file as MongoDB checks for this anyway.
// exports.checkID = (req, res, next, val) => {
//   console.log(`tour id is: ${val}`);
//   if (req.params.id * 1 > projects.length) {
//     return res.status(404).json({ status: "fail", message: "invalid id" });
//   }
//   next();
// };

// 👇🏻 we no longer need this file as MongoDB checks for this anyway.
// exports.checkBody = (req, res, next) => {
//   console.log(`checking body`);
//   if (!req.body.name || !req.body.category) {
//     return res.status(404).json({
//       status: "fail",
//       message: "project must have a name and category",
//     });
//   }
//   next();
// };

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find(); // if we don't specify anything in the parenthesis, all elements of the project will be returned.

    res.status(200).json({
      status: "success",
      results: projects.length,
      data: { projects },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    // findById is the same as Project.findOne({ _id: req.params.id })

    res.status(200).json({
      status: "success",
      data: { project },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }

  // const project = projects.find((el) => el.id === id);
  // res.status(200).json({ status: "success", data: { project } });
};

exports.addProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);

    res.status(201).json({
      status: "successs",
      data: {
        project: newProject,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: "invalid data set" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: { project },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteProject = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
