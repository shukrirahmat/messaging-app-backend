const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const jwt = require("jsonwebtoken");

const signUpUser = asyncHandler(async (req, res) => {
  const userExists = await db.findUser(req.body.username);
  if (userExists) {
    return res.json({
      success: false,
      message: `Username "${req.body.username}" already exists`,
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await db.createUser(req.body.username, hashedPassword);
  return res.json({ success: true, user: newUser });
});

const logInUser = asyncHandler(async (req, res) => {
  const user = await db.findUser(req.body.username);
  if (!user) {
    return res.json({
      success: false,
      message: "Username does not exists",
    });
  }

  const pwmatch = await bcrypt.compare(req.body.password, user.password);
  if (!pwmatch)
    return res.json({ success: false, message: "Password is incorrect" });

  const token = jwt.sign(
    { username: req.body.username },
    process.env.TOKEN_SECRET,
    { expiresIn: "24h" }
  );

  if (!token) return res.json({ success: false, message: "JWT token error" });
  else {
    await db.logInUser(req.body.username);
    return res.json({ success: true, token: token });
  }
});

const logOutUser = asyncHandler(async (req, res) => {
  const user = await db.logOutUser(req.currentUsername);
  return res.json(user);
});

const getUser = asyncHandler(async (req, res) => {
  const user = await db.findUser(req.currentUsername);
  return res.json(user);
});

const getUserList = asyncHandler(async (req, res) => {
  const users = await db.getUserList(req.currentUsername);
  return res.json(users);
});

const getUserProfile = asyncHandler(async (req, res) => {
  const userProfile = await db.getUserProfile(req.body.username);
  return res.json(userProfile);
});

const updateProfile = asyncHandler(async (req, res) => {
  if (req.currentUsername !== req.body.username) return res.sendStatus(403);
  const userProfile = await db.updateProfile(
    req.currentUsername,
    req.body.fullName,
    req.body.bio,
    req.body.gender,
    req.body.location
  );
  return res.json(userProfile);
});

module.exports = {
  signUpUser,
  logInUser,
  getUser,
  logOutUser,
  getUserList,
  getUserProfile,
  updateProfile
};
