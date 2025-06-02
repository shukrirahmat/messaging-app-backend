const {Router} = require("express");
const router = Router();
const userController = require("../controllers/userController.js");
const {verifyToken, updateLastVerified} = require("../controllers/authorization.js");

router.get("/", verifyToken, updateLastVerified, userController.getUser);
router.get("/list", verifyToken, updateLastVerified, userController.getUserList)
router.post("/", userController.signUpUser);
router.post("/log-in", userController.logInUser);
router.post("/log-out", verifyToken, updateLastVerified, userController.logOutUser);

module.exports = router;