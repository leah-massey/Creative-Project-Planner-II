const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Project = require("../../models/projectModel");
dotenv.config({ path: "./config.env" });

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

//READ JSON FILE
const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/projects.json`, "utf-8")
);

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Project.create(projects);
    console.log("data scuccesfully loaded! ");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await Project.deleteMany();
    console.log("data succesfully deleted! ");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
