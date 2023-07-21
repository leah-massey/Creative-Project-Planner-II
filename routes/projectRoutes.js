const express = require("express");
const projectRouter = require("../controllers/projectController");

const router = express.Router(); // middleware

router
  .route("/")
  .get(projectRouter.getAllProjects)
  .post(projectRouter.addProject);

router
  .route("/:id")
  .get(projectRouter.getProject)
  .patch(projectRouter.updateProject)
  .delete(projectRouter.deleteProject);

module.exports = router;
