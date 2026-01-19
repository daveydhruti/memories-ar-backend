const queries = require("../../crudOperations/Users/userRequests.js")
const userQuery = require("../../crudOperations/Users/userFriends.js")

//Function to send Request to new user
const sendRequest = async (req,res)=>{
    const userId = req.body.userId
    const recId = req.body.recId
    if(!userId || !recId || userId===recId)
    {
        return res.status(400).json("Invalid Details.")
    }
    else
    {
        try
        {
            const result = await queries.addUserRequests(userId,recId)
            if(result.insertId)
            {
                return res.status(200).json("Request Sent Successfully")
            }
        }
        catch(error){
            return res.status(400).json(error)
        }
    }
}

//Function to get all the requests of the users
const allRequests = async (req,res)=>{
    const userId = req.params.id

    if(!userId)
    {
        return res.status(400).json("Invalid Details.")
    }
    try {
        const result = await queries.allRequestsById(userId)
        console.log(result)
        res.status(200).json(result)
    } 
    catch (error) 
    {
        return res.status(400).json(error)
    }
}

//Function to decline Request
const declineRequest = async (req,res)=>{
    const userId = req.body.userId
    const recId = req.body.recId
    if(!userId || !recId || userId===recId)
    {
        return res.status(400).json("Invalid Details.")
    }
    else
    {
        try
        {
            const result = await queries.deleteRequest(userId,recId)
            if(result.affectedRows)
            {
                return res.status(200).json("Request Deleted Successfully")
            }
            else
            {
                return res.status(400).json("No Data Found.")
            }
        }
        catch(error){
            return res.status(400).json(error)
        }
    }
}

//Function to Accept Request
const acceptRequest = async (req,res)=>{
    const userId = req.body.userId
    const recId = req.body.recId
    if(!userId || !recId || userId===recId)
    {
        return res.status(400).json("Invalid Details.")
    }
    else
    {
        try
        {
            const result = await queries.deleteRequest(userId,recId)
            if(result.affectedRows)
            {
                try
                {
                    const added = await userQuery.addNewFriend(userId,recId)
                    if(added.affectedRows)
                    {
                        return res.status(200).json("Friend Added Successfully")
                    }
                }
                catch(error){
                    return res.status(400).json(error)
                }
            }
            else
            {
                return res.status(400).json("No Data Found.")
            }
        }
        catch(error){
            return res.status(400).json(error)
        }
    }
}

//Function to unfriend a user
const unfriendUser = async (req,res)=>{
    const userId = req.body.userId
    const friendId = req.body.friendId
    if(!userId || !friendId || userId===friendId)
    {
        return res.status(400).json("Invalid Details.")
    }
    else
    {
        try
        {
            const result = await userQuery.deleteFriend(userId,friendId)
            if(result.affectedRows)
            {
                return res.status(200).json("Unfriend Successfully")
            }
        }
        catch(error){
            return res.status(400).json(error)
        }
    }
}

const checkRequest = async (req,res)=>{
    const userId = req.params.userId
    const recId = req.params.recId
    if(!userId || !recId || userId===recId)
    {
        return res.status(400).json("Invalid Details.")
    }
    else
    {
        try
        {
            const result = await queries.checkRequest(userId,recId)
            console.log(result)
            if(result.length)
            {
                return res.status(200).json("Request Sent")
            }
            else
            {
                return res.status(400).json("No Data Found.")
            }
        }
        catch(error){
            return res.status(400).json(error)
        }
    }
}

module.exports = {sendRequest,checkRequest,allRequests,declineRequest,acceptRequest,unfriendUser}