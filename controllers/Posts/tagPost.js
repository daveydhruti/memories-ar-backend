const queries = require("../../crudOperations/Posts/tagPost.js");
const postQueries = require("../../crudOperations/Posts/userPost");

const tagUser = async (req, res) => {
  const { userId, postId, tagId } = req.body;
  if (!postId || !userId || !tagId)
    return res.status(401).json("Missing fields");
  try {
    if (!(await postQueries.findUserById(userId))) {
      return res.status(404).json("Invalid user ID");
    }
    if (!(await postQueries.findUserById(tagId))) {
      return res.status(404).json("Invalid tag ID");
    }
    if (!(await postQueries.findPostById(postId))) {
      return res.status(404).json("Invalid post ID");
    }
    if (await postQueries.findPostByIdAndUserId(postId, userId)) {
      if (await queries.findTagByPostIdAndTagId(postId, userId)) {
        return res.status(403).json("User has already been tagged");
      } else {
        await queries.tagUser(postId, tagId);
        return res.status(200).json("User has been tagged successfully.");
      }
    } else {
      return res.status(401).json("User cannot tag users on this post.");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const untagUser = async (req, res) => {
  const { userId, postId, tagId } = req.body;
  if (!postId || !userId || !tagId)
    return res.status(401).json("Missing fields");
  try {
    if (!(await postQueries.findUserById(userId))) {
      return res.status(404).json("Invalid user ID");
    }
    if (!(await postQueries.findUserById(tagId))) {
      return res.status(404).json("Invalid tag ID");
    }
    if (!(await postQueries.findPostById(postId))) {
      return res.status(404).json("Invalid post ID");
    }
    if (await postQueries.findPostByIdAndUserId(postId, userId)) {
      if (await queries.findTagByPostIdAndTagId(postId, userId)) {
        await queries.untagUser(postId, tagId);
        return res.status(200).json("User has been untagged successfully.");
      } else {
        return res.status(403).json("User has not been tagged");
      }
    } else {
      return res.status(401).json("User cannot untag users on this post.");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { tagUser, untagUser };
