/*
    Endpoints:
        GET /projects
        GET /projects/:id
        GET /projects/user/:user_id
*/

const router = require("express").Router();

const Project = require("../../database/helpers/project-model");

router.get("/", (req, res, next) => {
  const { limit, offset } = req.query;

  Project.find(limit, offset)
    .then((projects) => {
      projects.forEach((project) => {
        if (project.display_name) {
          project.username = project.display_name;
        }
        delete project.display_name;
      });
      res.status(200).json(projects);
    })
    .catch((err) => {
      console.log({ err });
      next("Server error occured while fetching projects.");
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Project.findById(id)
    .then((project) => {
      project
        ? res.status(200).json(project)
        : next("Project with the specified id could not be found.");
    })
    .catch(() => {
      next("Server error occured while fetching the project.");
    });
});

router.get("/user/:id", (req, res, next) => {
  const { id } = req.params;
  const { limit, offset } = req.query;

  Project.findByUser(id, limit, offset)
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(() => {
      next("Server error occured while fetching user's projects.");
    });
});

module.exports = router;
