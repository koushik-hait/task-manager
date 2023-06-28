const Task = require("../models/task");
const BaseController = require("../middlewares/baseController");
const CustomError = require("../utils/customError");



exports.addtask = BaseController(async (req, res, next) => {

    console.log(req.body);
    const { title, description, status } = req.body;
  
    if (!title || !description) {
      return next(new CustomError("title, description are required", 400));
    }
  
    const task = await Task.create({
      title,
      description,
      status,
    });
  
    console.log(task);

    res.status(200).json({
        success: true,
        task,
      });
  
  });


  exports.editTask = BaseController(async (req, res, next) => {
    // add a check for email and name in body
  
    // collect data from body
    const newData = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };
  
    // if photo comes to us
  
      const taskId = req.body.taskid;
  
    // update the data in task
    const task = await Task.findByIdAndUpdate(taskId, newData, {
      new: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      task
    });
  });

  exports.taskList = BaseController(async (req, res, next) => {
    // select all tasks
    const tasks = await Task.find();
  
    res.status(200).json({
      success: true,
      tasks,
    });
  });

  exports.taskDelete = BaseController(async (req, res, next) => {
    // get task from url
    const task = await Task.findById(req.params.id);
  
    if (!task) {
      return next(new CustomError("No Such task found", 401));
    }
  
    // remove task from databse
    await task.remove();
  
    res.status(200).json({
      success: true,
    });
  });


  exports.taskFilter = BaseController(async (req, res, next) => {

    const date = req.body.date;
    // select all tasks
    const tasks = await Task.find({createdAt: date});
  
    res.status(200).json({
      success: true,
      tasks,
    });
  });