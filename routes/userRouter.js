const {Router} = require("express");
const router = Router();
const userController = require("../controllers/userController.js")

router.post("/", userController.signUpUser);

module.exports = router;