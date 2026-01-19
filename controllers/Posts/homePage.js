const queries  = require("../../crudOperations/Posts/homePage.js")

const homePage = async (req,res)=>{
    const userId = req.params.id
    if(!userId)
    {
        return res.status(400).json("Invalid Details")
    }
    try{
        const result = await queries.getAllPosts(userId)
        if(result)
        {
            return res.status(200).json(JSON.parse(JSON.stringify(result)))
        }
    }
    catch(err)
    {
        return res.status(400).json(err)
    }
}

module.exports = {homePage}