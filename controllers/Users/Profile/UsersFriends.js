const queries = require("../../../crudOperations/Users/Profile/UsersFriends.js")

const getFriendsLists = async (req,res)=>{
    const userId = req.params.id
    if(!userId)
    {
        return res.status(400).json("userId is required")
    }
    try{
        const result = await queries.getAllUserFriends(userId)
        if(result)
        {
            return res.status(200).json(result)     // returns the IDs of all friends of the user
        }
    }
    catch(err)
    {
        return res.status(400).json(err)
    }
}   


const checkIsFriend = async (req,res)=>{
    const {id,friend} = req.params
    if(!id || !friend)
    {
        return res.status(400).json("userId and friendId are required")
    }
    try{

        const result = await queries.checkIsFriend(id,friend)
        if(result.length>0)
        {
            return res.status(200).json(true)   // returns true if the two users are friends
        }
        else
        {
            return res.status(200).json(false)  // returns false if the two users are not friends
        }
    }
    catch(err)
    {
        return res.status(400).json(err)
    }

}

module.exports = {getFriendsLists,checkIsFriend}