const pool = require("../../connect.js")

const db={}

db.searchByName=(name)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT id,firstName,lastName,profilePhoto FROM `users` WHERE (firstName LIKE "%'+name+'%" OR lastName LIKE "%'+name+'%") AND accStatus=0',(err,data)=>{
            console.log(data)
            if(err)
            {
                return reject(err)
            }
            else{
                return resolve(data)
            }
        })
    })
}

module.exports = db