const router = require("express").Router();

const bcrypt = require("bcryptjs");

const Project = require("../../database/helpers/project-model");

router.get("/projects", (req, res, next) => {
  const { decodedToken } = req;
  const { id: user_id, username } = decodedToken;

  Project.findByUser(user_id)
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(() => {
      next("Error retrieving user projects");
    });
});

router.post("/projects", (req, res, next) => {
  const { decodedToken } = req;
  const { id: user_id, username } = decodedToken;
  const projectData = { ...req.body, user_id };

  Project.add(projectData)
    .then((added) => {
      console.log({ added });
      res.status(200).json(added);
    })
    .catch(() => {
      next("Error adding project to database");
    });
});

module.exports = router;
