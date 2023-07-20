const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();

//* MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json()); // express.json() is the middleware - post request doesn't work without this!

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next(); // next must always be at the end of your middleware.
});

const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/projects.json`)
);

//* ROUTE HANDLERS
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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "response not yet set up",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "response not yet set up",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "response not yet set up",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "response not yet set up",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "response not yet set up",
  });
};

//* ROUTES
app.route("/api/v1/projects").get(getAllProjects).post(addProject);
app
  .route("/api/v1/projects/:id")
  .get(getProject)
  .patch(updateProject)
  .delete(deleteProject);

app.route("/api/v1/users").get(getAllUsers).post(createUser);
app
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

const port = 3002;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
