const pool = require("../../connect.js")

const db={}

db.createSearch = (userId,searchedUserId,statusTime) => {
    return new Promise((resolve,reject)=>{
        pool.query("INSERT INTO `recent_searches`(`userId`,`searchedUserId`,`statusTime`) VALUES (?,?,?)",[userId,searchedUserId,statusTime],(err,data)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(data)
        })
    })
}

// status value 1 = deleted
db.deleteSearch = (userId,searchedUserId) => {
    return new Promise((resolve,reject)=>{
        pool.query("SELECT * FROM `recent_searches` WHERE `userId` = ? AND  `searchedUserId` = ?",[userId,searchedUserId],(err,data)=>{
            if(err)
            {
                return reject(err)
            }
            if(data.length==0)
            {
                return reject("No Such Search")
            }
            pool.query("UPDATE `recent_searches`  SET `searchStatus` = 1 WHERE `userId` = ? AND  `searchedUserId` = ? AND `searchStatus` != 1 ",[userId,searchedUserId],(err,data)=>{
                if(err)
                {
                    return reject(err)
                }
                else if(data.affectedRows == 0)
                {
                    return reject("Search already deleted")
                }
                else{
                return resolve("Search Deleted Successfully")
                }
            })
        })
    })
}

db.userRecentSearches = (userId) => {
    return new Promise((resolve,reject)=>{
        pool.query("SELECT DISTINCT(rs.searchedUserId),u.firstName,u.profilePhoto,rs.statusTime FROM `recent_searches` rs INNER JOIN users u ON u.id=rs.userId WHERE rs.`userId` = ? AND `searchStatus` != 1 ORDER BY rs.statusTime DESC ",[userId],(err,data)=>{
            if(err)
            {
                return reject(err)
            }
            else if(data.length==0)
            {
                return reject("No Recent Searches")
            }
            return resolve(data)
        })
    })
}

db.suggestedUsers = (userId) => {
    return new Promise((resolve,reject)=>{
        pool.query("SELECT u.id,u.firstName,u.profilePhoto FROM users u WHERE u.id NOT IN (SELECT rs.searchedUserId FROM `recent_searches` rs WHERE rs.`userId` = ? AND `searchStatus` != 1) AND u.id != ? ORDER BY RAND() LIMIT 30",[userId,userId],(err,data)=>{
            if(err)
            {
                return reject(err)
            }
            else if(data.length==0)
            {
                return reject("No Suggested Users")
            }
            return resolve(data)
        })
    })
}
module.exports = db