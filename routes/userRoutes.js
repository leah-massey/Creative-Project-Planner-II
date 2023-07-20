const express = require("express");

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "response not yet set up",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "response not yet set up",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "response not yet set up",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "response not yet set up",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "response not yet set up",
  });
};

const router = express.Router(); // middleware

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
