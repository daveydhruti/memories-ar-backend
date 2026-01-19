const pool = require("../../connect.js");

const db = {};

db.addDislike = (scrapId, userId, time) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbook_dislikes` WHERE scrapId = ? AND userId = ?", [scrapId, userId], (err, results) => {
            if (err) {
                return reject(err.message);
            }
            else if (results.length > 0) {
                return reject("Scrapbook already disliked by user");
            }
            else{
                pool.query("INSERT INTO `scrapbook_dislikes` (scrapId, userId, time) VALUES (?, ?, ?)", [scrapId, userId, time], (err, results) => {
                    if (err) {
                        return reject(err.message);
                    }
                    return resolve(results);
                });
            }
        });
    });
};

db.getAllScrapDislikes = (scrapId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT userId, time FROM `scrapbook_dislikes` WHERE scrapId = ?", [scrapId], (err, results) => {
            if (err) {
                return reject(err.message);
            }
            if(results.length == 0){
                return reject("No dislikes found");
            }
            return resolve(results);
        });
    });
};

db.getAllUserDislikes = (userId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT scrapId, time FROM `scrapbook_dislikes` WHERE userId = ? ORDER BY `time` ASC", [userId], (err, results) => {
            if (err) {
                return reject(err.message);
            }
            if(results.length == 0){
                return reject("No dislikes found");
            }
            return resolve(results);
        });
    });
};

db.unDislike = (scrapId, userId) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM `scrapbook_dislikes` WHERE scrapId = ? AND userId = ?", [scrapId, userId], (err, results) => {
            if (err) {
                return reject(err.message);
            }
            return resolve(results);
        });
    });
};

db.checkDislike = (scrapId, userId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbook_dislikes` WHERE scrapId = ? AND userId = ?", [scrapId, userId], (err, results) => {
            if (err) {
                return reject(err.message);
            }
            else if(results.length == 0){
                return resolve(false);
            }
            else return resolve(true);
        });
    });
};

module.exports = db;