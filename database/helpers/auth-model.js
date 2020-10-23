const db = require("../db-config");

module.exports = {
  add,
  findByUsername,
  findByEmail,
  findById,
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

function findByEmail(email) {
  return db("user").where({ email }).first();
}

function findById(id) {
  return db("user").where({ id }).first();
}
