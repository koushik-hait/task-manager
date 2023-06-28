const express = require("express");
const router = express.Router();

const {
  addtask,
  editTask,
  taskFilter,
  taskList,
  taskDelete,
} = require("../controllers/taskController");
const { isLoggedIn } = require("../middlewares/user");

//task specific routes
router.route("/task/add").post(isLoggedIn, addtask);
router.route("/task/edit").post(isLoggedIn, editTask);
router.route("/task/delete/:id").post(isLoggedIn, taskDelete);
router.route("/task/filter").post(isLoggedIn, taskFilter);
router.route("/task/list").post(isLoggedIn, taskList);


module.exports = router;