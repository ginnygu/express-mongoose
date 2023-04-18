var express = require("express");
var router = express.Router();
const { createUser, loginUser } = require("../controllers/usersController");

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});
router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;
