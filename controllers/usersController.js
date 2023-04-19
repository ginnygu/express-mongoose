const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
	try {
		const { email, password, role } = req.body;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			email: email,
			hashedPassword: hashedPassword,
			role: role,
		});
		await newUser.save();
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({ success: false, message: error });
	}
};
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const foundUser = await User.findOne({ email: email });
		if (!foundUser) throw "Email and Password does not match";

		const matched = await bcrypt.compare(password, foundUser.hashedPassword);
		if (!matched) throw "Email and Password does not match!";
		//expiration time (60 minutes/1hr)
		const expiration = Math.floor(Date.now() / 1000) + 60 * 60;
		const secretKey = process.env.JWT_SECRET_KEY;

		const payload = {
			exp: expiration,
			userId: foundUser.id,
			email: foundUser.email,
		};

		const token = await jwt.sign(payload, secretKey);
		// const token = await jwt.sign(payload, secretKey, {expiresIn:"1hr "});

		res.json({ success: true, token: token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error });
	}
};

const verifyUser = async (req, res) => {
	try {
		const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;

		const token = req.header(tokenHeaderKey);
		const secretKey = process.env.JWT_SECRET_KEY;

		const verify = jwt.verify(token, secretKey);
		if (!verify) {
			res.status(401).json({ success: false });
		}

		const foundUser = await User.findOne({ id: verify.userId });
		verify.role = foundUser.role;

		res.json({ success: true, user: verify });
	} catch (error) {
		res.status(401).json({ success: false, message: error });
	}
};

module.exports = {
	createUser,
	loginUser,
	verifyUser,
};
