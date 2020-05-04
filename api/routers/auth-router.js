const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Auth = require("../../database/helpers/auth-model");
const secrets = require("../secrets");

router.post("/register", (req, res, next) => {
  const newUser = req.body;
  const { username, password, email } = newUser;
  const minLength = 6;
  if (!username || !password || !email) {
    next("Username, email and password is required!");
  } else if (username.length < minLength || password.length < minLength) {
    next(`Username and password must be at least ${minLength} characters!`);
  } else {
    const rounds = process.env.HASH_ROUNDS || 12;
    const hash = bcrypt.hashSync(password, rounds);

    newUser.password = hash;

    Auth.add(newUser)
      .then((addedUser) => {
        res.status(201).json(addedUser);
      })
      .catch(() => {
        next("Error registering!");
      });
  }
});

router.post("/login", (req, res, next) => {
  const user = req.body;
  const { username, password } = user;
  Auth.findByUsername(username)
    .then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome, ${username}!`, token });
      } else {
        next("Wrong credentials!");
      }
    })
    .catch(() => {
      next("Login failed!");
    });
});

function generateToken({ id, username }) {
  const payload = { id, username };
  const secret = secrets.JWT_SECRET;
  const options = { expiresIn: "1d" };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
