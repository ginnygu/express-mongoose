const Blog = require("../models/Blog");

async function getAllBlogs(req, res) {
	try {
		const allBlogs = await Blog.find({});
		res.json({ success: true, blogs: allBlogs });
	} catch (error) {
		res.json({ success: false, message: error });
	}
}

async function createBlog(req, res) {
	try {
		const newBlog = new Blog({
			title: req.body.title,
			author: req.body.author,
			text: req.body.text,
		});
		const response = await newBlog.save();
		res.json({ success: true, addedBlog: response });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error });
	}
}

module.exports = {
	getAllBlogs,
	createBlog,
};
