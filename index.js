require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const authMiddleware = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const bootstrap = () => {
  const app = express();
  const port = process.env.PORT || 3001;
  
  //Middlewares
  app.use(express.json());
  
  // Routes
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.post("/welcome", authMiddleware, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

bootstrap();


