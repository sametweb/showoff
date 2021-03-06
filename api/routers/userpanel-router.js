/*
    Endpoints:
        GET /userpanel/projects
        POST /userpanel/projects
        PATCH /userpanel/projects/:id
        DELETE /userpanel/projects/:id
        
        GET /userpanel/comments
        POST /userpanel/comments
        PATCH /userpanel/comments/:id
        DELETE /userpanel/comments/:id
*/

const router = require("express").Router();

const Project = require("../../database/helpers/project-model");

router.get("/projects", async (req, res, next) => {
  const { decodedToken } = req;
  const { id: user_id } = decodedToken;

  try {
    const projects = await Project.findByUser(user_id);

    res.status(200).json(projects);
  } catch {
    next("Error retrieving user projects");
  }
});

router.post("/projects", async (req, res, next) => {
  const { decodedToken } = req;
  const { id: user_id } = decodedToken;
  const projectData = { ...req.body, user_id };

  try {
    const addedProject = await Project.add(projectData);

    res.status(200).json(addedProject);
  } catch {
    next("Error adding project to database");
  }
});

router.patch("/projects/:id", async (req, res, next) => {
  const { decodedToken } = req;
  const { id: user_id } = decodedToken;
  const id = Number(req.params.id);
  const updatedData = req.body;

  try {
    const found = await Project.findById(id);

    if (found.user_id === user_id) {
      const updated = await Project.update(updatedData, id);

      if (updated) {
        res.status(200).json(updated);
      } else {
        next("Update operation failed.");
      }
    } else {
      next("You are not authorized to perform this operation!");
    }
  } catch {
    next("The project you are trying to update does not exist.");
  }
});

router.delete("/projects/:id", async (req, res, next) => {
  const { decodedToken } = req;
  const { id: user_id } = decodedToken;
  const id = Number(req.params.id);

  Project.findById(id)
    .then((found) => {
      // Checking if user owns the post to be deleted
      if (found.user_id === user_id) {
        Project.remove(id)
          .then((deleted) => {
            deleted
              ? res.status(204).end()
              : next("Delete failed: nothing deleted");
          })
          .catch(() => {
            next("Error deleting the project");
          });
      } else {
        next("You are not authorized!");
      }
    })
    .catch(() => {
      next("Project cannot be found!");
    });
});

module.exports = router;
