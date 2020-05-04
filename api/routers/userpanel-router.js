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

router.patch("/projects/:id", async (req, res, next) => {
  const { decodedToken } = req;
  const { id: user_id, username } = decodedToken;
  const id = Number(req.params.id);
  const updatedData = req.body;

  Project.findById(id).then((found) => {
    // Checking if user owns the post to be updated
    if (found.user_id === user_id) {
      Project.update(updatedData, id)
        .then((updated) => {
          updated ? res.status(200).json(updated) : next("Update failed");
        })
        .catch(() => {
          next("Error updating the project");
        });
    } else {
      next("You are not authorized");
    }
  });
});

module.exports = router;
