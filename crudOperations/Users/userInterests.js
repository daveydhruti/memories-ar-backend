const pool = require("../../connect.js")

const db={}

db.insertInterest =(interestId,userId)=>{
    return new Promise((resolve,reject)=>{
        pool.query("INSERT INTO `users_interests`(`interestsId`, `userID`) VALUES (?,?)",[interestId,userId],(err,data)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(data)
        })
    })
}

db.getAllInterest =(userId)=>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT * FROM `users_interests` WHERE userId=?;",userId,(err,data)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(data)
        })
    })
}

db.deleteInterest =(interestId,userId)=>{
    return new Promise((resolve,reject)=>{
        pool.query("DELETE FROM `users_interests` WHERE interestsId=? and userID=?",[interestId,userId],(err,data)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(data)
        })
    })
}

module.exports = db