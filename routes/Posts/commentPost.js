const express = require("express");
const router = express.Router();
const {
  postComment,
  deleteComment,
  getAllComments
} = require("../../controllers/Posts/commentPost.js")

router.get("/allComments/:id", getAllComments);
router.post("/post", postComment);
router.delete("/delete", deleteComment);

module.exports = router;
