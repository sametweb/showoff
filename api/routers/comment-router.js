/*
    Endpoints:
        GET /comments
        GET /comments/:id
        GET /comments/user/:user_id
*/

const router = require("express").Router();

const Comment = require("../../database/helpers/comment-model");
const Auth = require("../../database/helpers/auth-model");

router.get("/", async (req, res, next) => {
  const { limit, offset } = req.query;

  try {
    const comments = await Comment.find(limit, offset);

    res.status(200).json(comments);
  } catch {
    next("Server error occured while fetching comments.");
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);

    if (comment) {
      res.status(200).json(comment);
    } else {
      next("Comment with the specified id could not be found.");
    }
  } catch {
    next("Server error occured while fetching the comment.");
  }
});

router.get("/user/:id", async (req, res, next) => {
  const { id } = req.params;
  const { limit, offset } = req.query;

  const user = await Auth.findById(id);

  if (user) {
    try {
      const comments = await Comment.findByUser(id, limit, offset);

      res.status(200).json(comments);
    } catch {
      next("Server error occured while fetching user comments.");
    }
  } else {
    next("User does not exist.");
  }
});

module.exports = router;
