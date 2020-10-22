const jwt = require("jsonwebtoken");

const secrets = require("../secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const { JWT_SECRET } = secrets;

  if (token) {
    jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
      if (error) {
        next("Invalid token.");
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    next("Please provide credentials.");
  }
};
