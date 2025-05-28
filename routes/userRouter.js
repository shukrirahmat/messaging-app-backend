const {Router} = require("express");
const router = Router();
const userController = require("../controllers/userController.js");
const {verifyToken} = require("../controllers/authorization.js");

router.get("/", verifyToken, userController.getUser);
router.post("/", userController.signUpUser);
router.post("/log-in", userController.logInUser);

module.exports = router;