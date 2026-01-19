const pool = require("./../../../connect.js")

const db = {}

db.addReportAcc = (userId,reportUserId,reason)=>{
    return new Promise((resolve,reject)=>{
        pool.query("INSERT INTO `report_account`(`userId`, `reportUserId`, `reason`, `status`) VALUES (?,?,?,?)",[userId,reportUserId,reason,'act'],(err,data)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(data)
        })
    })
}


module.exports = db