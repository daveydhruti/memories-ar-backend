const queries = require("../../crudOperations/Scrapbooks/reportScrapbook.js")

const reportScrapbook = async (req,res)=>{
    const {userId, scrapId, reason} = req.body

    if(!userId || !scrapId || !reason)
    {
        return res.status(400).json("Incomplete Details!")
    }
    try
    {
        const result = await queries.reportScrapbook(userId,scrapId,reason)
        if(result.insertId)
        {
            return res.status(200).json("Scrapbook Reported Successfully")
        }
    }
    catch(err)
    {
        return res.status(400).json(err.message)
    }
}

module.exports = {reportScrapbook}