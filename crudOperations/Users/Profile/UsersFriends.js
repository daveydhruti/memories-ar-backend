const pool = require("../../../connect.js")

const db = {}

// query to get all friends ID of a user

db.getAllUserFriends = (userId)=>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT DISTINCT(id) AS userId,u.firstName,u.lastName,u.profilePhoto from users u INNER JOIN (SELECT userId,friendId,friendDate FROM `user_friends` WHERE `userId` = ? OR `friendId` = ?) v ON u.id=v.userId OR u.id=v.friendId WHERE u.id!= ? ORDER BY v.friendDate DESC",[userId,userId,userId],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            else
            {
                return resolve(result)
            }
        })
    })

}

db.checkIsFriend = (userId,friendId)=>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT * FROM `user_friends` WHERE (`userId` = ? AND `friendId` = ?) OR (`userId` = ? AND `friendId` = ?)",[userId,friendId,friendId,userId],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            else
            {
                return resolve(result)
            }
        })
    }
    )
}

module.exports = db