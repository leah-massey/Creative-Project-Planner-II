const fs = require("fs");

const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/projects.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`tour id is: ${val}`);
  if (req.params.id * 1 > projects.length) {
    return res.status(404).json({ status: "fail", message: "invalid id" });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  console.log(`checking body`);
  if (!req.body.name || !req.body.category) {
    return res.status(404).json({
      status: "fail",
      message: "project must have a name and category",
    });
  }
  next();
};

exports.getAllProjects = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: projects.length,
    data: { projects },
  });
};

exports.getProject = (req, res) => {
  const id = req.params.id * 1;

  const project = projects.find((el) => el.id === id);
  res.status(200).json({ status: "success", data: { project } });
};

exports.addProject = (req, res) => {
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

exports.updateProject = (req, res) => {
  res.status(200).json({
    status: "success",
    data: { project: "< this is a placeholder for the updated project. >" },
  });
};

exports.deleteProject = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
