const likeQueries = require("../../crudOperations/Posts/likePost");
const queries = require("../../crudOperations/Posts/dislikePost");
const postQueries = require("../../crudOperations/Posts/userPost");

const dislikePost = async (req, res) => {
  const { userId, postId } = req.body;
  if (!postId || !userId) return res.status(401).json("Missing fields")
  try {
    if (!(await postQueries.findUserById(userId))) {
      return res.status(404).json("Invalid user ID");
    }
    if (!(await postQueries.findPostById(postId))) {
      return res.status(404).json("Invalid post ID");
    }
    if (await queries.findDislikeByUserIdAndPostId(userId, postId)) {
      return res.status(403).json("Post has already been disliked");
    } else {
      await queries.dislikePost(userId, postId);
      if (await likeQueries.findLikeByUserIdAndPostId(userId, postId)) {
        await likeQueries.unlikePost(userId, postId);
      }
      return res.status(200).json("Post has been disliked successfully.");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const undislikePost = async (req, res) => {
  const { userId, postId } = req.body;
  if (!postId || !userId) return res.status(401).json("Missing fields")
  try {
    if (!(await postQueries.findUserById(userId))) {
      return res.status(404).json("Invalid user ID");
    }
    if (!(await postQueries.findPostById(postId))) {
      return res.status(404).json("Invalid post ID");
    }
    if (await queries.findDislikeByUserIdAndPostId(userId, postId)) {
      await queries.undislikePost(userId, postId);
      return res.status(200).json("Post has been undisliked successfully");
    } else {
      return res.status(403).json("Post has not been disliked.");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { dislikePost, undislikePost };
