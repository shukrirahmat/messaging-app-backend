const {Router} = require("express");
const router = Router();
const userController = require("../controllers/userController.js")

router.post("/", userController.signUpUser);
router.post("/log-in", userController.logInUser);

module.exports = router;