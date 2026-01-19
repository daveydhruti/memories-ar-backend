const pool = require("../../connect.js")

const db ={}

db.reportPost=(userId,postId,reason)=>{
    return new Promise((resolve,reject)=>{
        pool.query("INSERT INTO `report_posts`(`userId`, `postId`, `reason`) VALUES (?,?,?)",[userId,postId,reason],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

module.exports = db