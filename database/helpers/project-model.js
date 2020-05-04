const db = require("../db-config");

module.exports = {
  find,
  findById,
  findByUser,
  add,
};

function find(limit = 10, offset = 0) {
  return db("project as p")
    .leftJoin("comment as c", "p.id", "c.project_id")
    .select("p.*")
    .groupBy("p.id")
    .orderBy("p.id", "desc")
    .count("c.id as comment_count")
    .limit(limit)
    .offset(offset);
}

function findById(id) {
  return db("project")
    .where({ id })
    .first()
    .then(async (project) => {
      const comments = await db("comment")
        .where({ project_id: project.id })
        .join("user", "user.id", "comment.user_id")
        .select("text", "created_at", "updated_at", "username", "display_name");
      return { ...project, comments };
    });
}

function findByUser(user_id, limit = 10, offset = 0) {
  return db("project as p")
    .leftJoin("comment as c", "p.id", "c.project_id")
    .where("p.user_id", user_id)
    .select("p.*")
    .groupBy("p.id")
    .orderBy("p.id", "desc")
    .count("c.id as comment_count")
    .limit(limit)
    .offset(offset);
}

function add(projectData) {
  return db("project")
    .insert(projectData, "id")
    .then(([id]) => {
      return db("project").where({ id }).first();
    });
}
