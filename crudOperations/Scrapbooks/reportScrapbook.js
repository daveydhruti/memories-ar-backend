const pool = require("../../connect.js")

const db ={}

db.reportScrapbook=(userId,scrapId,reason)=>{
    return new Promise((resolve,reject)=>{
        pool.query("INSERT INTO `report_scrapbooks`(`userId`, `scrapId`, `reason`) VALUES (?,?,?)",[userId,scrapId,reason],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

module.exports = db