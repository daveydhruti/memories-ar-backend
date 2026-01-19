const pool = require("../../connect.js");

const db = {};

db.SaveScrapbook = (userId,scrapId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO saved_scrapbooks (userId,scrapId) VALUES (?,?)`,
            [userId,scrapId],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    });
};

db.GetSavedScrapbooks = (userId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM saved_scrapbooks WHERE userId = ? ORDER BY time DESC`,
            [userId],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                if(results.length === 0){
                    return resolve("No saved scrapbooks");
                }
                return resolve(results);
            }
        );
    });
};

db.DeleteSavedScrapbook = (userId,scrapId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `DELETE FROM saved_scrapbooks WHERE userId = ? AND scrapId = ?`,
            [userId,scrapId],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    });
};

db.checkSavedScrapbook = (userId,scrapId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM saved_scrapbooks WHERE userId = ? AND scrapId = ?`,
            [userId,scrapId],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                if(results.length === 0){
                    return resolve(false)
                }
                return resolve(true);
            }
        );
    });
};

module.exports = db;