/*
    Endpoints:
        GET /comments
        GET /comments/:id
        GET /comments/user/:user_id
*/

const router = require("express").Router();

const Comment = require("../../database/helpers/comment-model");
const Auth = require("../../database/helpers/auth-model");

router.get("/", (req, res, next) => {
  const { limit, offset } = req.query;

  Comment.find(limit, offset)
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch(() => {
      next("Error fetching comments");
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Comment.findById(id)
    .then((comment) => {
      comment
        ? res.status(200).json(comment)
        : next("Comment with specified id could not be found.");
    })
    .catch(() => {
      next("Error fetching comment");
    });
});

router.get("/user/:id", async (req, res, next) => {
  const { id } = req.params;
  const { limit, offset } = req.query;

  try {
    const user = await Auth.findById(id);

    if (user.username) {
      Comment.findByUser(id, limit, offset)
        .then((comments) => {
          res.status(200).json(comments);
        })
        .catch(() => {
          next("Error fetching comments");
        });
    }
  } catch {
    next("User does not exist");
  }
});

module.exports = router;
