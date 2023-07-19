const express = require("express");

const app = express();

app.get("/", (req, res) => {});

const port = 3002;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
