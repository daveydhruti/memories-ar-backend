const pool = require("../../connect.js");

const db = {};

db.createCategory = async (categoryName) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbook_categories` WHERE `categoryName`=?", [categoryName], (err, result) => {
            if (err) {
                return reject(err);
            }
            if(result.length > 0) {
                return reject("Category already exists");
            }
            else{
                pool.query("INSERT INTO `scrapbook_categories` (`categoryName`) VALUES (?)", [categoryName], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                });
            }
        });
        
    });
};

db.getCategory = async (categoryId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT categoryName FROM `scrapbook_categories` WHERE `categoryId`=?", [categoryId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.getAllCategories = async () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbook_categories`", (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.updateCategory = async (categoryName, categoryId) => {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE `scrapbook_categories` SET `categoryName`=? WHERE `categoryId`=?", [categoryName, categoryId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.deleteCategory = async (categoryId) => {
    return new Promise((resolve, reject) => {
        if(!categoryId) {
            return reject("categoryId is required");
        }
        pool.query("DELETE FROM `scrapbook_categories` WHERE `categoryId`=?", [categoryId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

module.exports = db;