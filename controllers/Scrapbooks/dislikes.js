const queries = require("../../crudOperations/Scrapbooks/dislikes.js");
const likeQueries = require("../../crudOperations/Scrapbooks/likes.js");

const addDislike = async (req, res) => {
    try {
        const { scrapId, userId, time } = req.body;
        if(likeQueries.checkLike(scrapId, userId)){
            likeQueries.unLike(scrapId, userId);
        }
        const result = await queries.addDislike(scrapId, userId, time);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error adding dislike",
            body: {
                error: error
            }
        });
    }
};

const getAllScrapDislikes = async (req, res) => {
    try {
        const { scrapId } = req.body;
        const result = await queries.getAllScrapDislikes(scrapId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching dislikes",
            body: {
                error: error
            }
        });
    }
};

const getAllUserDislikes = async (req, res) => {
    try {
        const { userId } = req.body;
        const result = await queries.getAllUserDislikes(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching dislikes",
            body: {
                error: error
            }
        });
    }
};

const unDislike = async (req, res) => {
    try {
        const { scrapId, userId } = req.body;
        if((queries.checkDislike(scrapId, userId))){
            return res.status(500).json({
                status: "error",
                message: "Error removing dislike",
                body: {
                    error: "User has not disliked this scrapbook"
                }
            });
        }
        else{
            const result = await queries.unDislike(scrapId, userId);
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error removing dislike",
            body: {
                error: error
            }
        });
    }
};

module.exports = {addDislike, getAllScrapDislikes, getAllUserDislikes, unDislike}