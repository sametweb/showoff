/*
    Endpoints:
        POST /register
        POST /login
*/

const router = require("express").Router();
const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");
const validateEmail = require("../utils/validateEmail");
const Auth = require("../../database/helpers/auth-model");

router.post("/register", (req, res, next) => {
  const newUser = req.body;
  const { username, password, email } = newUser;
  const usernameMinLength = 8;
  const passwordMinLength = 6;

  if (!username || !password || !email) {
    next("Username, email and password is required!");
  } else if (username.length < usernameMinLength) {
    next(`Username must be at least ${usernameMinLength} characters.`);
  } else if (password.length < passwordMinLength) {
    next(`Password must be at least ${passwordMinLength} characters.`);
  } else if (!validateEmail(email)) {
    next("E-mail address is not valid.");
  } else {
    const rounds = process.env.HASH_ROUNDS || 12;
    const hash = bcrypt.hashSync(password, rounds);

    newUser.password = hash;

    Auth.add(newUser)
      .then((addedUser) => {
        delete addedUser.password;
        res.status(201).json(addedUser);
      })
      .catch(() => {
        next("There was an error while registering. Please try again.");
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
        next("Username and password don't match.");
      }
    })
    .catch(() => {
      next("The username you entered is not in the system!");
    });
});

module.exports = router;
