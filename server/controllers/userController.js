const User = require("../models/user");
const BaseController = require("../middlewares/baseController");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const crypto = require("crypto");
const fs = require('fs');

exports.signup = BaseController(async (req, res, next) => {
  //let result;
  console.log(req.body);

  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return next(new CustomError("Name, email and password are required", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  console.log(user);

  cookieToken(user, res);
});

exports.login = BaseController(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  // check for presence of email and password
  if (!email || !password) {
    return next(new CustomError("please provide email and password", 400));
  }

  // get user from DB
  const user = await User.findOne({ email }).select("+password");

  // if user not found in DB
  if (!user) {
    return next(
      new CustomError("Email or password does not match or exist", 400)
    );
  }

  // match the password
  const isPasswordCorrect = await user.isValidatedPassword(password);

  //if password do not match
  if (!isPasswordCorrect) {
    return next(
      new CustomError("Email or password does not match or exist", 400)
    );
  }

  // if all goes good and we send the token
  cookieToken(user, res);
});

exports.logout = BaseController(async (req, res, next) => {
  //clear the cookie
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  //send JSON response for success
  res.status(200).json({
    success: true,
    message: "Logout success",
  });
});


exports.getLoggedInUserDetails = BaseController(async (req, res, next) => {
  //req.user will be added by middleware
  // find user by id
  const user = await User.findById(req.user.id);

  //send response and user data
  res.status(200).json({
    success: true,
    user,
  });
});

