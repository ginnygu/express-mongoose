const mongoose = require("mongoose");

const mongodb = process.env.ATLAS_URI;
console.log(mongodb);
const database = process.env.MONGO_DATABASE;

async function mongooseConnect() {
	try {
		await mongoose.connect(mongodb, { dbName: database });
		console.log("connected to database");
	} catch (error) {
		console.log(error);
	}
}

module.exports = mongooseConnect;
