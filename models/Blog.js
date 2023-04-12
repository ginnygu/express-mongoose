//Model, Schema
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
// Schema the shape of the data
const blogSchema = new mongoose.Schema({
	title: { type: String, require: true },
	author: { type: Boolean, require: true },
	//default creates something for us if we don't
	//pass anything in
	createAt: { type: Date, default: Date.now },
	text: { type: String, require: true },
	id: { type: String, default: uuidv4 },
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
