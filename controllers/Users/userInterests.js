const queries = require("../../crudOperations/Users/userInterests.js")

const getAllInterest = async (req,res)=>{
    const userId = req.body.userId
    try {
        const result = await queries.getAllInterest(userId);
        if(result.length)
        {
            return res.status(200).json(result)
        }   
        else
        {
            return res.status(200).json("User Interest Not Found")
        }
    } catch (error) {
        return res.status(404).json(error)
    }
}

const createInterest = async (req,res)=>{
    const interestId = req.body.interestId
    const userId = req.body.userId
    if(!interestId || !userId )
    {
        return res.status(404).json("Invalid Details")
    }
    try {
        const result = await queries.insertInterest(interestId,userId);
        if(result.affectedRows)
        {
            return res.status(200).json("User Interest Added Successfully")
        }
        else
        {
            return res.status(200).json("User Interest Not Added")
        }
    } catch (error) {
        return res.status(404).json(error)
    }
}

const deleteInterest = async (req,res)=>{
    const interestId = req.body.interestId
    const userId = req.body.userId
    if(!interestId || !userId )
    {
        return res.status(404).json("Invalid Details")
    }
    try {
        const result = await queries.deleteInterest(interestId,userId);
        if(result.affectedRows)
        {
            return res.status(200).json("User Interest Deleted Successfully")
        }
        else
        {
            return res.status(200).json("User Interest Not Found")
        }
    } catch (error) {
        return res.status(404).json(error)
    }
}

module.exports = {getAllInterest,createInterest,deleteInterest}