const queries = require("../../crudOperations/Users/recentSearches.js")

const createSearch = async (req,res)=>{
    const userId = req.body.userId
    const searchedUserId = req.body.searchedUserId
    const statusTime = req.body.statusTime

    if(!userId || !searchedUserId || !statusTime)
    {
        return res.status(404).json("Incomplete Details")
    }
    try {
        const result = await queries.createSearch(userId,searchedUserId,statusTime);
        if(result.insertId)
        {
            return res.status(200).json("Search Added Successfully")
        }

    } catch (error) {
        return res.status(404).json(error)
    }
}

const deleteSearch = async (req,res)=>{
    const userId = req.body.userId
    const searchedUserId = req.body.searchedUserId

    if(!userId || !searchedUserId)
    {
        return res.status(404).json("Incomplete Details")
    }
    try {
        const result = await queries.deleteSearch(userId,searchedUserId);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(404).json(error)
    }
}

const userRecentSearches = async (req,res)=>{
    const userId = req.params.id

    if(!userId)
    {
        return res.status(404).json("Incomplete Details")
    }
    try {
        const result = await queries.userRecentSearches(userId);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(404).json(error)
    }
}

const suggestedUsers= async (req,res)=>{
    const userId = req.params.id

    if(!userId)
    {
        return res.status(404).json("Incomplete Details")
    }
    try {
        const result = await queries.suggestedUsers(userId);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(404).json(error)
    }
}

module.exports = {createSearch,deleteSearch,userRecentSearches,suggestedUsers}