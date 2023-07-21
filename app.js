const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");
const projectRouter = require("./routes/projectRoutes");

const app = express();

//* MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json()); // express.json() is the middleware - post request doesn't work without this!

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next(); // next must always be at the end of your middleware.
});

app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/users", userRouter);

const port = 3002;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
