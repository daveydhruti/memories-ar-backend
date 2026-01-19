const queries = require("../../crudOperations/Posts/commentPost.js");
const postQueries = require("../../crudOperations/Posts/userPost");

const postComment = async (req, res) => {
  const { postId, comment, userId } = req.body;
  if (!postId || !userId || !comment || comment.split(" ").join("") === "")
    return res.status(401).json("Missing fields");
  try {
    if (!(await postQueries.findUserById(userId))) {
      return res.status(404).json("Invalid user ID");
    }
    if (!(await postQueries.findPostById(postId))) {
      return res.status(404).json("Invalid post ID");
    }
    const result = await queries.addComment(postId, userId, comment);
    if (result.insertId) {
      return res.status(200).json("Comment was posted successfully.");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteComment = async (req, res) => {
  const { commentId, userId, postId } = req.body;
  if (!commentId || !userId || !postId)
    return res.status(400).json("Missing fields");
  try {
    if (!(await postQueries.findUserById(userId))) {
      return res.status(404).json("Invalid user ID");
    }
    if (!(await postQueries.findPostById(postId))) {
      return res.status(404).json("Invalid post ID");
    }
    if (!(await queries.findCommentById(commentId))) {
      return res.status(404).json("Invalid comment ID");
    }
    if (await queries.findCommentByIdAndPostId(commentId, postId)) {
      if (await queries.findCommentByIdAndUserId(commentId, userId)) {
        await queries.deleteCommentById(commentId);
        return res.status(200).json("Comment deleted successfully.");
      } else {
        if (await postQueries.findPostByIdAndUserId(postId, userId)) {
          await queries.deleteCommentById(commentId);
          return res.status(200).json("Comment deleted successfully.");
        } else {
          return res.status(401).json("Comment cannot be deleted by this user");
        }
      }
    } else {
      return res.status(404).json("Comment doesn't exist");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAllComments = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json("Missing fields");
  try {
    const result = await queries.getAllComments(id);
    if (result.length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json("No comments found");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};



module.exports = { postComment, deleteComment,getAllComments };
