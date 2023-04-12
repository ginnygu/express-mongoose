const Blog = require("../models/Blog");

async function getAllBlogs(req, res, next) {
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
			category: req.body.category,
		});
		const response = await newBlog.save();
		res.json({ success: true, addedBlog: response });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error });
	}
}

async function getOneBlogById(req, res) {
	try {
		//console.log(req.params);
		const { idToGet } = req.params;
		console.log(idToGet);
		const foundBlog = await Blog.findOne({ id: idToGet });
		res.json({ success: true, blog: foundBlog });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error });
	}
}

async function updateOneBlogById(req, res) {
	try {
		const { idToUpdate } = req.params;

		const updatedBlog = await Blog.findOneAndUpdate(
			{ id: idToUpdate },
			req.body
		);
		res.json({ success: true, blogUpdate: updatedBlog });
	} catch (error) {}
}

module.exports = {
	getAllBlogs,
	createBlog,
	getOneBlogById,
	updateOneBlogById,
};
