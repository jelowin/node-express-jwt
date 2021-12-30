const mongoose = require("mongoose");

const db_options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

exports.connect = () => {
    // Connecting to the database
    return mongoose.connect(process.env.MONGO_URI, db_options).then(() => {
        console.log("Successfully connected to database");
        }).catch((error) => {
        console.log("Database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
        });
};