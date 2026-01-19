const pool = require("../../connect.js");

const db = {};

db.addComment = (scrapId, userId, comment) => {
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO `scrapbook_comments` (`scrapId`, `userId`, `comment`) VALUES (?,?,?)", [scrapId, userId, comment], (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
};

db.findCommentByIdAndScrapId = (commentId, scrapId) => {
    return new Promise((resolve, reject) => {
      const findCommentQuery =
        "SELECT * FROM `scrapbook_comments` WHERE `commentId`=? AND `scrapId`=?";
      pool.query(findCommentQuery, [commentId, scrapId], (err, result) => {
        if (err) {
          return reject(err);
        } else if (result.length) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      });
    });
};

db.findCommentByIdAndUserId = (commentId, userId) => {
    return new Promise((resolve, reject) => {
        const findCommentQuery =
            "SELECT * FROM `scrapbook_comments` WHERE `commentId`=? AND `userId`=?";
        pool.query(findCommentQuery, [commentId, userId], (err, result) => {
            if (err) {
                return reject(err);
            } else if (result.length) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        });
    });
};

db.findScrapbookByIdAndUserId = (scrapId, userId) => {
    return new Promise((resolve, reject) => {
        const findScrapbookQuery =
            "SELECT * FROM `scrapbooks` WHERE `scrapId`=? AND `userId`=?";
        pool.query(findScrapbookQuery, [scrapId, userId], (err, result) => {
            if (err) {
                return reject(err);
            } else if (result.length) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        });
    });
};

db.findCommentById = (commentId) => {
    return new Promise((resolve, reject) => {
        const findCommentQuery = "SELECT * FROM `scrapbook_comments` WHERE `commentId`=?";
        pool.query(findCommentQuery, [commentId], (err, result) => {
            if (err) {
                return reject(err);
            } else if (result.length) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        });
    });
};

db.deleteComment = (commentId) => {
    return new Promise((resolve, reject) => {
        const deleteCommentQuery = "DELETE FROM `scrapbook_comments` WHERE `commentId`=?";
        pool.query(deleteCommentQuery, [commentId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.getAllComments = (scrapId) => {
    return new Promise((resolve, reject) => {
        const getAllCommentsQuery = "SELECT sc.userId,sc.commentId,sc.comment,u.firstName,u.lastName,u.profilePhoto FROM `scrapbook_comments` sc INNER JOIN users u ON u.id=sc.userId WHERE `scrapId`=? ORDER BY sc.commentTime DESC";
        pool.query(getAllCommentsQuery, [scrapId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

module.exports = db;