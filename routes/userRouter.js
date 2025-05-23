const {Router} = require("express");
const router = Router();
const userController = require("../controllers/userController.js")

router.get("/", (req, res) => {
    res.send("Returned user");
})
router.post("/", userController.signUpUser);

module.exports = router;