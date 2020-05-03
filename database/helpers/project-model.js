/*
    Endpoints:
        /projects (GET) -> .find()
        /projects/:id (GET) -> .findById()
        /projects/user/:user_id (GET) -> .findByUser()
*/

const db = require("../db-config");

module.exports = {
  find,
  findById,
  findByUser,
};

function find() {
  return db("comment as c")
    .count("c.id as comment_count")
    .join("project as p", "p.id", "c.project_id")
    .select(
      "p.id",
      "p.name",
      "p.description",
      "p.short_description",
      "p.demo_url",
      "p.repo_url",
      "p.image_url",
      "p.tech_stack",
      "p.created_at",
      "p.updated_at"
    )
    .groupBy(
      "p.id",
      "p.name",
      "p.description",
      "p.short_description",
      "p.demo_url",
      "p.repo_url",
      "p.image_url",
      "p.tech_stack",
      "p.created_at",
      "p.updated_at"
    )
    .orderBy("p.id", "desc");
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

function findByUser(user_id) {
  return db("comment as c")
    .count("c.id as comment_count")
    .join("project as p", "p.id", "c.project_id")
    .where("p.user_id", user_id)
    .select(
      "p.id",
      "p.name",
      "p.description",
      "p.short_description",
      "p.demo_url",
      "p.repo_url",
      "p.image_url",
      "p.tech_stack",
      "p.created_at",
      "p.updated_at"
    )
    .groupBy(
      "p.id",
      "p.name",
      "p.description",
      "p.short_description",
      "p.demo_url",
      "p.repo_url",
      "p.image_url",
      "p.tech_stack",
      "p.created_at",
      "p.updated_at"
    )
    .orderBy("p.id", "desc");
}
