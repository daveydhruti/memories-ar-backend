const pool = require("../../connect.js");

const db = {};

db.addLike = (scrapId, userId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbook_likes` WHERE scrapId = ? AND userId = ?", [scrapId, userId], (err, results) => {
            if (err) {
                return reject(err.message);
            }
            else if (results.length > 0) {
                return reject("Scrapbook already liked by user");
            }
            else{
                pool.query("INSERT INTO `scrapbook_likes` (scrapId, userId) VALUES (?, ? )", [scrapId, userId], (err, results) => {
                    if (err) {
                        return reject(err.message);
                    }
                    return resolve(results);
                });
            }
        });
    });
};

db.getAllScrapLikes = (scrapId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT userId FROM `scrapbook_likes` WHERE scrapId = ?", [scrapId], (err, results) => {
            if (err) {
                return reject(err.message);
            }
            if(results.length == 0){
                return reject("No likes found");
            }
            return resolve(results);
        });
    });
};

db.getAllUserLikes = (userId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT scrapId, time FROM `scrapbook_likes` WHERE userId = ? ORDER BY `time` ASC", [userId], (err, results) => {
            if (err) {
                return reject(err.message);
            }
            if(results.length == 0){
                return reject("No likes found");
            }
            return resolve(results);
        });
    });
};

db.unLike = (scrapId, userId) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM `scrapbook_likes` WHERE scrapId = ? AND userId = ?", [scrapId, userId], (err, results) => {
            if (err) {
                return reject(err.message);
            }
            return resolve(results);
        });
    });
};

db.checkLike = (scrapId, userId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbook_likes` WHERE scrapId = ? AND userId = ?", [scrapId, userId], (err, results) => {
            if (err) {
                return reject(err.message);
            }
            if(results.length == 0){
                return resolve(false);
            }
            return resolve(true);
        });
    });
};

module.exports = db;