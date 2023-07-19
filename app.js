const fs = require("fs");
const express = require("express");

const app = express();

const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/projects.json`)
);

app.get("/api/v1/projects", (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: projects.length, data: { projects } });
});

const port = 3002;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
