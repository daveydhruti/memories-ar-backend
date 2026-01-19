const pool = require("../../connect.js");

const db = {};

db.AddImage = async (scrapId, link, textHeading ) => {
    return new Promise((resolve, reject) => {
        if(!scrapId || !link) {
            return reject("scrapId and link are required");
        }
        pool.query("INSERT INTO `scrapbook_images` (`scrapId`, `link`, `textHeading`) VALUES (?, ?, ?)", [scrapId, link, textHeading], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.GetImage = async (pictureId) => {
    return new Promise((resolve, reject) => {
        if(!pictureId) {
            return reject("pictureId is required");
        }
        pool.query("SELECT * FROM `scrapbook_images` WHERE `pictureId`=?", [pictureId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.GetImageByScrapId = async (scrapId) => {
    return new Promise((resolve, reject) => {
        if(!scrapId) {
            return reject("scrapId is required");
        }
        pool.query("SELECT * FROM `scrapbook_images` WHERE `scrapId`=?", [scrapId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.UpdateImage = async ( pictureId , link, textHeading) => {
    return new Promise((resolve, reject) => {
        if(!pictureId || !link) {
            return reject("pictureId and link are required");
        }
        if(link){
            pool.query("UPDATE `scrapbook_images` SET `link`=? WHERE `pictureId`=?", [link, pictureId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        }
        if(textHeading){
            pool.query("UPDATE `scrapbook_images` SET `textHeading`=? WHERE `pictureId`=?", [textHeading, pictureId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        }
    });
};

db.DeleteImage = async (pictureId) => {
    return new Promise((resolve, reject) => {
        if(!pictureId) {
            return reject("pictureId is required");
        }
        pool.query("DELETE FROM `scrapbook_images` WHERE `pictureId`=?", [pictureId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.deleteAllScrapImages = async (scrapId) => {
    return new Promise((resolve, reject) => {
        if(!scrapId) {
            return reject("scrapId is required");
        }
        pool.query("DELETE FROM `scrapbook_images` WHERE `scrapId`=?", [scrapId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

module.exports = db;