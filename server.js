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
  })
  .then(() => console.log("DB connection successful!"));

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A project must have a name"],
    unique: true,
  },
  category: {
    type: String,
    required: [true, "A project must have a category"],
  },
  description: {
    type: String,
    default: "You currently don't have any further notes on this project.",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Project = mongoose.model("Project", projectSchema);
// console.log(process.env);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
