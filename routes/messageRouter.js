const {Router} = require("express");
const router = Router();
const messageController = require("../controllers/messageController.js");
const {verifyToken, updateLastVerified} = require("../controllers/authorization.js");

router.post("/", verifyToken, updateLastVerified, messageController.createMessage);

module.exports = router;