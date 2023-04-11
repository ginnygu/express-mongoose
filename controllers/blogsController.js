const Blog = require("../models/Blog");

async function getAllBlogs(req, res) {
	try {
		const allBlogs = await Blog.find({});
		res.json({ success: true, blogs: allBlogs });
	} catch (error) {
		res.json({ success: false, message: error });
	}
}

module.exports = {
	getAllBlogs,
};
