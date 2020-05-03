const router = require("express").Router();

const Project = require("../../database/helpers/project-model");

router.get("/", (req, res, next) => {
  const { limit, offset } = req.query;

  Project.find(limit, offset)
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(() => {
      next("Error fetching projects");
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Project.findById(id)
    .then((project) => {
      project
        ? res.status(200).json(project)
        : next("Project with specified id could not be found");
    })
    .catch(() => {
      next("Error fetching project");
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
      next("Error fetching projects");
    });
});

module.exports = router;
