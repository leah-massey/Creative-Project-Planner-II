const express = require("express");
const projectController = require("../controllers/projectController");

const router = express.Router(); // middleware

// we no longer need this now we are using MongoDB 👇🏻
// router.param("id", projectController.checkID);

router
  .route("/")
  .get(projectController.getAllProjects)
  .post(projectController.addProject);

router
  .route("/:id")
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
