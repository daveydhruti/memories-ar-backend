const express = require("express");
const router = express.Router();
const {
  likePost,
  unlikePost,
} = require("../../controllers/Posts/likePost")

router.post("/like", likePost);
router.delete("/unlike", unlikePost);

module.exports = router;
