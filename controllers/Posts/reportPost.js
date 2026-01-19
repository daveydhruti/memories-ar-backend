const queries = require("../../crudOperations/Posts/reportPost.js")

const reportPost = async (req,res)=>{
    const userId = req.body.userId
    const postId = req.body.postId
    const reason = req.body.reason

    if(!userId || !postId || !reason)
    {
        return res.status(400).json("Invalid Details!")
    }
    try
    {
        const result = await queries.reportPost(userId,postId,reason)
        if(result.insertId)
        {
            return res.status(200).json("Post Reported Successfully")
        }
    }
    catch(err)
    {
        return res.status(400).json(err)
    }
}

module.exports = {reportPost}