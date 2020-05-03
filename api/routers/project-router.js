const router = require("express").Router();

const Project = require("../../database/helpers/project-model");

router.get("/", (req, res, next) => {
  Project.find()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
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
    .catch((err) => {
      next("Error fetching project");
    });
});

router.get("/user/:id", (req, res, next) => {
  const { id } = req.params;
  Project.findByUser(id)
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      next("Error fetching projects");
    });
});

module.exports = router;
