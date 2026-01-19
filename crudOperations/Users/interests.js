const pool = require("../../connect.js")

const db={}

db.insertInterest =(name)=>{
    return new Promise((resolve,reject)=>{
        pool.query("INSERT INTO `interests`(`name`) VALUES (?)",[name],(err,data)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(data)
        })
    })
}

db.getAllInterest =()=>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT * FROM interests",(err,data)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(data)
        })
    })
}

db.updateInterest =(oldName,name)=>{
    return new Promise((resolve,reject)=>{
        pool.query("UPDATE `interests` SET `name`=? WHERE `name`=?",[name,oldName],(err,data)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(data)
        })
    })
}

db.deleteInterest =(name)=>{
    return new Promise((resolve,reject)=>{
        pool.query("DELETE FROM `interests` WHERE name=?",[name],(err,data)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(data)
        })
    })
}

module.exports = db