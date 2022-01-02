const { jwtVerifyAsync } = require("../utils/jwt");

module.exports = async (req, res, next) => {
    const token = req.cookies.uid || req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    try {
      const decoded = await jwtVerifyAsync(token);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }

    return next();
  };