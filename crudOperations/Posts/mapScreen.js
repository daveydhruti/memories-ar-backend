const pool = require("../../connect.js")

const db = {}

db.getAllPosts = (userId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT DISTINCT(u.id) AS userId,up.id AS postId,u.profilePhoto,u.firstName,u.lastName,upp.photo as PhotoLink,up.lattitude,up.longitude from users u INNER JOIN user_posts up INNER JOIN (SELECT userId,friendId,friendDate FROM `user_friends` WHERE `userId` = ? OR `friendId` = ?) v INNER JOIN user_post_photos upp ON (u.id=v.userId OR u.id=v.friendId) AND u.id=up.userId AND up.id=upp.postId ORDER BY up.uploadTime DESC LIMIT 100;",[userId,userId], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

module.exports = db