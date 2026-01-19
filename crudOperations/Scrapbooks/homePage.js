
const pool = require("../../connect.js");

const db = {};


db.getAllScrapbooks = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT ab.userId,ab.profilePhoto,ab.firstName,ab.lastName,ab.id AS scrapId, ab.coverPhoto,ab.name,ab.ScrapLikes,Count(sc.userId) as ScrapComments from scrapbook_comments sc RIGHT JOIN ( SELECT abc.id,Count(sl.userId) as ScrapLikes,abc.userId,abc.profilePhoto,abc.firstName,abc.lastName, abc.coverPhoto,abc.name from scrapbook_likes sl RIGHT JOIN ( SELECT DISTINCT(u.id) AS userId, s.scrapId as id, u.profilePhoto,u.firstName,u.lastName, s.coverPhoto,s.name from users u INNER JOIN scrapbooks s INNER JOIN ( SELECT userId,friendId,friendDate FROM `user_friends` WHERE `userId` = ? OR `friendId` = ? ) v ON (u.id=v.userId OR u.id=v.friendId) AND u.id=s.userId ) abc ON sl.scrapId=abc.id GROUP BY abc.id ) ab ON sc.scrapId=ab.id GROUP BY ab.id ORDER BY scrapId DESC"
    pool.query(query, [id, id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = db;
