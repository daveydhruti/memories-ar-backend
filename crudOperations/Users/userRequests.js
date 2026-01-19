const pool = require("./../../connect.js")

const db = {}

db.addUserRequests = (userId,receiveId)=>
{
    return new Promise((resolve,reject)=>{
        //2 - pending
        pool.query("INSERT INTO `user_requests`(`userId`, `receiveId`, `requestStatus`) VALUES (?,?,?)",[userId,receiveId,"2"],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(result)
        })
    })
}



db.allRequestsById = (userId)=>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT ur.userId,u.firstName,u.lastName,u.profilePhoto FROM `user_requests` ur INNER JOIN users u ON u.id=ur.userId WHERE receiveId=? AND requestStatus=2 ORDER BY sendDate DESC;",userId,(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

db.deleteRequest = (userId,recId)=>{
    return new Promise((resolve,reject)=>{
        pool.query("DELETE FROM `user_requests` WHERE userId=? AND receiveId=?",[userId,recId],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

db.checkRequest = (userId,recId)=>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT * FROM `user_requests` WHERE userId=? AND receiveId=?",[userId,recId],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(result)
        })
    }
    )
}

module.exports = db