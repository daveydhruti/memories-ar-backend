const pool = require("../../connect.js");

const db = {};

db.createTemplate = async (templateName, templateDescription, categoryId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbook_templates` WHERE templateName=?", [templateName], (err, result) => {
            if (err) {
                return reject(err);
            }
            if (result.length > 0) {
                return reject("Template already exists");
            }
            else{
                pool.query("INSERT INTO `scrapbook_templates` (`templateName`, `templateDescription`, `categoryId`) VALUES (?, ?, ?)", [templateName, templateDescription, categoryId], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                });
            }
        });
    });
};

db.getTemplateById = async (templateId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbook_templates` WHERE templateId=?", [templateId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.getAllTemplates = async () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbook_templates`", (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);

        });
    });
};

db.updateTemplate = async (templateId, templateName, templateDescription, categoryId) => {
    return new Promise((resolve, reject) => {
        if(templateName){
            pool.query("UPDATE `scrapbook_templates` SET `templateName`=? WHERE templateId=?", [templateName, templateId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        }
        if(templateDescription){
            pool.query("UPDATE `scrapbook_templates` SET `templateDescription`=? WHERE templateId=?", [templateDescription, templateId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        }
        if(categoryId){
            pool.query("UPDATE `scrapbook_templates` SET `categoryId`=? WHERE templateId=?", [categoryId, templateId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        }
    });
};

db.deleteTemplate = async (templateId) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM `scrapbook_templates` WHERE templateId=?", [templateId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.getTemplatesByCategory = async (categoryId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbook_templates` WHERE categoryId=?", [categoryId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

module.exports = db;