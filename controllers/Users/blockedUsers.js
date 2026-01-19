const queries = require("../../crudOperations/Users/blockedUsers.js")

const blockUser = async (req,res)=>{
    const userId = req.body.userId
    const blockUser = req.body.blockId
    if(!userId || !blockUser || userId===blockUser)
    {
        return res.status(400).json("Invalid Details")
    }
    try{
        const result = await queries.addBlockedUser(userId,blockUser)
        if(result.insertId)
        {
            return res.status(200).json("User Blocked Successfully")
        }
    }
    catch(err)
    {
        return res.status(400).json(err)
    }
}

const unblockUser = async (req,res)=>{
    const userId = req.body.userId
    const unblockUser = req.body.unblockId
    if(!userId || !unblockUser || userId===unblockUser)
    {
        return res.status(400).json("Invalid Details")
    }
    try{
        const result  = await queries.deleteBlockedUser(userId,unblockUser)
        if(result.affectedRows)
        {
            return res.status(200).json("User Unblocked Successfully")
        }
    }
    catch(err)
    {
        return res.status(400).json(err)
    }
}

const allBlockedUsers = async (req,res)=>{
    const userId = req.params.id
    if(!userId)
    {
        return res.status(400).json("Invalid Details")
    }
    try{
        const result  = await queries.getAllBlockedUsers(userId)
        if(result){
            return res.status(200).json(result)
        }
    }
    catch(err)
    {
        return res.status(400).json(err)
    }
}

module.exports = {blockUser,unblockUser,allBlockedUsers}