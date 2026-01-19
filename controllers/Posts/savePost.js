const queries = require("../../crudOperations/Posts/savePost.js");
const postQueries = require("../../crudOperations/Posts/userPost");

const savePost = async (req, res) => {
  const { postId, userId } = req.body;
  if (!postId || !userId) return res.status(401).json("Missing fields");
  try {
    if (!(await postQueries.findUserById(userId))) {
      return res.status(404).json("Invalid user ID");
    }
    if (!(await postQueries.findPostById(postId))) {
      return res.status(404).json("Invalid post ID");
    }
    if (await queries.findSavedPostByUserIdAndPostId(userId, postId)) {
      return res.status(403).json("Post has already been saved");
    } else {
      await queries.savePost(userId, postId);
      return res.status(200).json("Post has been saved successfully.");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const unsavePost = async (req, res) => {
  const { userId, postId } = req.body;
  if (!postId || !userId) return res.status(401).json("Missing fields");
  try {
    if (!(await postQueries.findUserById(userId))) {
      return res.status(404).json("Invalid user ID");
    }
    if (!(await postQueries.findPostById(postId))) {
      return res.status(404).json("Invalid post ID");
    }
    if (await queries.findSavedPostByUserIdAndPostId(userId, postId)) {
      await queries.unsavePost(userId, postId);
      return res.status(200).json("Post has been unsaved successfully");
    } else {
      return res.status(403).json("Post has not been saved.");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getSavedPosts = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  try {
    const result = await queries.getUsersSavedPosts(id);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { savePost, unsavePost, getSavedPosts };
