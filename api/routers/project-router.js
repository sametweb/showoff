const router = require("express").Router();

const Project = require("../../database/helpers/project-model");

router.get("/", (req, res) => {
  Project.find()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "Error fetching projects", err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Project.findById(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "Error fetching project", err });
    });
});

module.exports = router;
