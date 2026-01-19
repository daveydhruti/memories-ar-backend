const pool = require("../../connect.js")

const db = {}

//Function to execute the query to add blocked user
db.addBlockedUser = (userId,blockedUserId)=>{
    return new Promise((resolve,reject)=>{
        pool.query("INSERT INTO `block_users`(`userId`, `blockedUserId`) VALUES (?,?)",[userId,blockedUserId],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(result)
        })
    })
}


//Function to execute query for unblock users
db.deleteBlockedUser = (userId,blockedUserId)=>{
    return new Promise((resolve,reject)=>{
        pool.query("DELETE FROM `block_users` WHERE userId=? AND blockedUserId=?",[userId,blockedUserId],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

//Function to execute query to get the all the blocked users
db.getAllBlockedUsers = (userId)=>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT bu.blockedUserId,u.firstName,u.lastName,u.profilePhoto FROM `block_users` bu INNER JOIN users u ON u.id=bu.blockedUserId WHERE userId=? ORDER BY dateBlocked DESC",[userId],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

module.exports = db