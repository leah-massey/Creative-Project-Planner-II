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
  console.log(req.body);
  res.send("done"); // we always need to send something back
});

const port = 3002;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
