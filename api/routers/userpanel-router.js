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

router.get("/projects", (req, res, next) => {
  const { decodedToken } = req;
  const { id: user_id } = decodedToken;

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
  const { id: user_id } = decodedToken;
  const projectData = { ...req.body, user_id };

  Project.add(projectData)
    .then((added) => {
      res.status(200).json(added);
    })
    .catch(() => {
      next("Error adding project to database");
    });
});

router.patch("/projects/:id", async (req, res, next) => {
  const { decodedToken } = req;
  const { id: user_id } = decodedToken;
  const id = Number(req.params.id);
  const updatedData = req.body;

  Project.findById(id)
    .then((found) => {
      // Checking if user owns the post to be updated
      if (found.user_id === user_id) {
        Project.update(updatedData, id)
          .then((updated) => {
            updated
              ? res.status(200).json(updated)
              : next("Update failed: nothing updated");
          })
          .catch(() => {
            next("Error updating the project");
          });
      } else {
        next("You are not authorized!");
      }
    })
    .catch(() => {
      next("Project cannot be found!");
    });
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
