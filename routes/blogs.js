const express = require("express");
const router = express.Router();
//./bin/www -> app.js -> router -> controller -> model
const { getAllBlogs } = require("../controllers/blogsController");

router.get("/", (req, res) => {
	//res.send response with a string
	res.send("hello from blogs");
});

// router.get("/function", function(req,res){
// same as above
// })
//callback are used inside the argument
router.get("/all-blogs", getAllBlogs);

//MVC: Model, Controller, View
//View: React Application

// router.post()
// router.delete()
module.exports = router;
