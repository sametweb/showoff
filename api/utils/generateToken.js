const jwt = require("jsonwebtoken");
const secrets = require("../secrets");

function generateToken(user) {
  const { id, username } = user;
  const payload = { id, username };
  const secret = secrets.JWT_SECRET;
  const options = { expiresIn: "1d" };

  return jwt.sign(payload, secret, options);
}

module.exports = generateToken;
