const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json()); // express.json() is the middleware - post request doesn't work without this!

const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/projects.json`)
);

app.get("/api/v1/projects", (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: projects.length, data: { projects } });
});

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

const port = 3002;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
