const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

//* this code was just for testing
// const testProject = new Project({
//   name: "Marble some paper",
//   category: "art",
//   description: "Use traditional methods to make designs/",
// });

// testProject
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log("ERROR !! Yikes!!", err);
//   });

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
