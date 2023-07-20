const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json()); // express.json() is the middleware - post request doesn't work without this!

const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/projects.json`)
);

//. get all projects
app.get("/api/v1/projects", (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: projects.length, data: { projects } });
});

//. get individual project
app.get("/api/v1/projects/:id", (req, res) => {
  const id = req.params.id * 1;

  if (id > projects.length) {
    return res.status(404).json({ status: "fail", message: "invalid id" });
  }

  const project = projects.find((el) => el.id === id);
  res.status(200).json({ status: "success", data: { project } });
});

// create a project
app.post("/api/v1/projects", (req, res) => {
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
});

// update a project
app.patch("/api/v1/projects/:id", (req, res) => {
  if (req.params.id * 1 > projects.length) {
    return res.status(404).json({ status: "fail", message: "invalid id" });
  }

  res.status(200).json({
    status: "success",
    data: { project: "< this is a placeholder for the updated project. >" },
  });
});

// delete a project
app.delete("/api/v1/projects/:id", (req, res) => {
  if (req.params.id * 1 > projects.length) {
    return res.status(404).json({ status: "fail", message: "invalid id" });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

const port = 3002;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
