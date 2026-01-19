const express = require("express");
const router = express.Router();
const {
  dislikePost,
  undislikePost,
} = require("../../controllers/Posts/dislikePost")

router.post("/dislike", dislikePost);
router.delete("/undislike", undislikePost);

module.exports = router;
