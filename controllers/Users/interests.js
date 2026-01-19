const queries = require("../../crudOperations/Users/interests.js")

const getAllInterest = async (req,res)=>{
    try {
        const result = await queries.getAllInterest();
        return res.status(200).json(result)
    } catch (error) {
        return res.status(404).json(error)
    }
}

const createInterest = async (req,res)=>{
    const name = req.body.name
    if(!name)
    {
        return res.status(404).json("Invalid Details")
    }
    try {
        const result = await queries.insertInterest(name);
        if(result.insertId)
        {
            return res.status(200).json("Interest Added Successfully")
        }
        
    } catch (error) {
        return res.status(404).json(error)
    }
}
const updateInterest = async (req,res)=>{
    const name = req.body.name
    const oldName = req.body.oldName

    if(!name || !oldName)
    {
        return res.status(404).json("Invalid Details")
    }
    try {
        const result = await queries.updateInterest(oldName,name);
        if(result.affectedRows)
        {
            return res.status(200).json("Interest Updated Successfully")
        }
        
    } catch (error) {
        return res.status(404).json(error)
    }
}
const deleteInterest = async (req,res)=>{
    const name = req.body.name
    try {
        const result = await queries.deleteInterest(name);
        if(result.affectedRows)
        {
            return res.status(200).json("Interest Deleted Successfully")
        }
    } catch (error) {
        return res.status(404).json(error)
    }
}

module.exports = {getAllInterest,createInterest,updateInterest,deleteInterest}