const pool = require("../../connect.js")

const db={}

db.getThemes = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM account_themes", (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

db.getPlatformSettings = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM platform_settings", (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

db.getInterests = () => {
    return new Promise((resolve, reject) => {
        const getInterestQuery = `SELECT users.id AS userId, users.email, users.firstName, users.lastName, 
        users_interests.interestsId AS interestId, interests.name AS interestName FROM users 
        RIGHT JOIN users_interests ON users.id = users_interests.userID
        INNER JOIN interests ON users_interests.interestsId = interests.id
        ORDER BY users.id`
        pool.query(getInterestQuery, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

module.exports = db