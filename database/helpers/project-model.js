const db = require("../db-config");

module.exports = {
  find,
  findById,
};

function find() {
  return db("project");
}

function findById(id) {
  return db("project").where({ id }).first();
}
