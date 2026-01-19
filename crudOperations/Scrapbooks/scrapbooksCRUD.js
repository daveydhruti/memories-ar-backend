const pool = require("../../connect.js");

const db = {};

db.createScrapbook = async (userId, name, caption, lattitude, longitude, contentFlag, coverPhoto, templateId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbooks` WHERE `name` = ? AND `userId` = ?", [name, userId], (err, result) => {
            if (err) {
                return reject(err);
            }
            else if(result.length) {
                return reject("Scrapbook with this name already exists");
            }
            else{
                if( lattitude && longitude ) {
                    pool.query("INSERT INTO `scrapbooks` (`userId`, `name`, `caption`, `lattitude`, `longitude`, `contentFlag`, `coverPhoto`, `templateId`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [userId, name, caption, lattitude, longitude, contentFlag, coverPhoto, templateId], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(result);
                    });
                }
                
            }
        });
        
    });
};

db.updateScrapbook = async (scrapId, name, caption, lattitude, longitude, lastEditTime, contentFlag, coverPhoto) => {
    return new Promise((resolve, reject) => {
        if(!scrapId) {
            return reject("scrapId is required");
        }
        pool.query("UPDATE `scrapbooks` SET `name`=?, `caption`=?, `lattitude`=?, `longitude`=?, `lastEditTime`=?, `contentFlag`=?, `coverPhoto`=? WHERE `scrapId`=?", [name, caption, lattitude, longitude, lastEditTime, contentFlag, coverPhoto, scrapId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}


db.getScrapbook = async (scrapId) => {
    return new Promise((resolve, reject) => {
        if(!scrapId) {
            return reject("scrapId is required");
        }
        pool.query("SELECT * FROM `scrapbooks` WHERE `scrapId`=?", [scrapId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.getAllUserScrapbooks = async (userId) => {
    return new Promise((resolve, reject) => {
        if(!userId) {
            return reject("userId is required");
        }
        pool.query("SELECT * FROM `scrapbooks` WHERE `userId`=? ORDER BY uploadTime ASC", [userId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.deleteScrapbookById = async (scrapId) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM `scrapbooks` WHERE scrapId=?", [scrapId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.deleteAllUserScrapbooks = async (userId) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE t1 FROM `scrapbooks` AS t1 INNER JOIN `scrapbook_images` AS t2 ON t1.scrapId = t2.scrapId WHERE userId=?", [userId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.checkScrapbookExists = async (scrapId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbooks` WHERE `scrapId`=?", [scrapId], (err, result) => {
            if (err) {
                return reject(err);
            }
            if(result.length) {
                return resolve(true);
            }
            return resolve(false);
        });
    });
};

db.getFictionalScrapbooks = async (userId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbooks` WHERE `contentFlag` = 0 AND `userId` = ?", [userId] , (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.getOpinionScrapbooks = async (userId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbooks` WHERE `contentFlag` = 1 AND `userId` = ?", [userId] , (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

module.exports = db;