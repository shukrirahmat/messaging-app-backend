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
    { expiresIn: "1h" }
  );

  if (!token) return res.json({ success: false, message: "JWT token error" });
  else {
    await db.logUser(req.body.username);
    return res.json({ success: true, token: token});
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = await db.findUser(req.currentUsername);
  return res.json(user);
});

module.exports = {
  signUpUser,
  logInUser,
  getUser,
};
