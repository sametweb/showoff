/*
    Endpoints:
        /login (POST)
        /register (POST)
*/
const db = require("../db-config");

module.exports = {
  add,
  findByUsername,
};

function add(newUser) {
  return db("user")
    .insert(newUser, "id")
    .then(([id]) => {
      return db("user").where({ id }).first();
    });
}

function findByUsername(username) {
  return db("user").where({ username }).first();
}
