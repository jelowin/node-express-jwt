require("dotenv").config();
require("./config/database");
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require("express");
const helmet = require('helmet');
const authMiddleware = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 3001;

//Middlewares
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(helmet());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = {app, server}



