const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const verifyToken = asyncHandler(async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        req.currentUsername = data.username;
        next();
      }
    });
  } else {
    return res.sendStatus(403);
  }
});

const updateLastVerified = asyncHandler(async (req, res, next ) => {
  await db.updateLastVerified(req.currentUsername);
  next();
})

module.exports = {
  verifyToken,
  updateLastVerified
};