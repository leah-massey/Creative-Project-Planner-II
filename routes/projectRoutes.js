const fs = require("fs");
const express = require("express");

const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/projects.json`)
);

const router = express.Router(); // middleware

const getAllProjects = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: projects.length,
    data: { projects },
  });
};

const getProject = (req, res) => {
  const id = req.params.id * 1;

  if (id > projects.length) {
    return res.status(404).json({ status: "fail", message: "invalid id" });
  }

  const project = projects.find((el) => el.id === id);
  res.status(200).json({ status: "success", data: { project } });
};

const addProject = (req, res) => {
  const newId = projects[projects.length - 1].id + 1;
  console.log(projects.length);
  console.log(newId);
  const newProject = Object.assign({ id: newId }, req.body); //Object.assign merges the two given objects

  projects.push(newProject);
  fs.writeFile(
    `${__dirname}/dev-data/data/projects.json`,
    JSON.stringify(projects),
    (err) => {
      res.status(201).json({
        status: "successs",
        data: {
          project: newProject,
        },
      });
    }
  );
};

const updateProject = (req, res) => {
  if (req.params.id * 1 > projects.length) {
    return res.status(404).json({ status: "fail", message: "invalid id" });
  }

  res.status(200).json({
    status: "success",
    data: { project: "< this is a placeholder for the updated project. >" },
  });
};

const deleteProject = (req, res) => {
  if (req.params.id * 1 > projects.length) {
    return res.status(404).json({ status: "fail", message: "invalid id" });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

router.route("/").get(getAllProjects).post(addProject);

router.route("/:id").get(getProject).patch(updateProject).delete(deleteProject);

module.exports = router;
