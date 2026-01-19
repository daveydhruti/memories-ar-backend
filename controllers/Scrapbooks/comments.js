const queries = require("../../crudOperations/Scrapbooks/comments.js");
const userQueries = require("../../crudOperations/Users/users.js");
const scrapQueries = require("../../crudOperations/Scrapbooks/scrapbooksCRUD.js");

const addComment = async (req, res) => {
    const { scrapId, comment, userId } = req.body;
    if (!scrapId || !userId || !comment)
        return res.status(401).json("Missing fields");
    try {
        console.log(userId)
        if (!(await userQueries.checkUserById(userId))) {
            return res.status(404).json("Invalid user ID");
        }
        const newComment = await queries.addComment(scrapId, userId, comment);
            return res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error adding new comment",
            body: {
                error: error
            }
        });
    }
};

const deleteComment = async (req, res) => {
    const { commentId, userId, scrapId } = req.body;
    if (!commentId || !userId || !scrapId)
      return res.status(400).json("Missing fields");
    try {
      if (!(await userQueries.checkUserById(userId))) {
        return res.status(404).json("Invalid user ID");
      }
      if (!(await scrapQueries.checkScrapbookExists(scrapId))) {
        return res.status(404).json("Invalid scrapbook ID");
      }
      if (!(await queries.findCommentById(commentId))) {
        return res.status(404).json("Invalid comment ID");
      }
      if(await queries.findCommentByIdAndScrapId(commentId, scrapId)){
            if(await queries.findCommentByIdAndUserId(commentId, userId)){
                await queries.deleteComment(commentId);
                return res.status(200).json("Comment deleted successfully.");
            } else {
                if(await queries.findScrapbookByIdAndUserId(scrapId, userId)){ //here
                    await queries.deleteComment(commentId);
                    return res.status(200).json("Comment deleted successfully.");
                } else {
                    return res.status(401).json("Comment cannot be deleted by this user");
                }
            }
        } else {
            return res.status(404).json("Comment doesn't exist");
        }
    } catch (error) {
      return res.status(400).json(error.message);
    }
};

const getAllComments = async (req, res) => {
    const { scrapId } = req.params;
    if (!scrapId) return res.status(400).json("Missing fields");
    try {
        if (!(await scrapQueries.checkScrapbookExists(scrapId))) {
            return res.status(404).json("Invalid scrapbook ID");
        }
        const comments = await queries.getAllComments(scrapId);
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = { addComment, deleteComment, getAllComments };