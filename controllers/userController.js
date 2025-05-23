const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const signUpUser = asyncHandler(async (req, res) => {

  const userExists = await db.findUser(req.body.username);
  if (userExists) {
    return res.json({
      success: false, message: `Username "${req.body.username}" already exists`,
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await db.createUser(req.body.username, hashedPassword);
  return res.json({success: true, user: newUser});
})

module.exports = {
    signUpUser
}