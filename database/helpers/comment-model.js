const db = require("../db-config");

module.exports = {
  find,
  findById,
  findByUser,
  add,
  //   update,
  //   remove,
};

function find(limit = 10, offset = 0) {
  return db("comment").limit(limit).offset(offset);
}

function findById(id) {
  return db("comment").where({ id }).first();
}

function findByUser(user_id, limit = 10, offset = 0) {
  return db("comment")
    .where({ user_id })
    .select("id", "project_id", "text", "created_at", "updated_at")
    .orderBy("created_at", "desc")
    .limit(limit)
    .offset(offset);
}

function add(newComment) {
  return db("comment")
    .insert(newComment, "id")
    .then(([id]) => {
      return db("comment").where({ id }).first();
    });
}

// function update(updatedData, id) {
//   return db("project")
//     .update(updatedData, "id")
//     .where({ id })
//     .then(([project_id]) => {
//       return db("project").where({ id: project_id }).first();
//     });
// }

// function remove(id) {
//   return db("project").del().where({ id });
// }
