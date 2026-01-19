const pool = require("../../connect.js");

const db = {};

// create group
db.createGroup = (userId, groupName, visibility) => {
  return new Promise((resolve, reject) => {
    const createGroupQuery =
      "INSERT INTO `groups` (`createdBy`, `updatedBy`, `groupName`, `visibility`) VALUES (?,?,?,?)";
    pool.query(
      createGroupQuery,
      [userId, userId, groupName, visibility],
      (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      }
    );
  });
};

// edit group
db.editGroup = (editGroupQuery, fields) => {
  return new Promise((resolve, reject) => {
    pool.query(editGroupQuery, fields, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

// delete group
db.deleteGroup = (groupId) => {
  return new Promise((resolve, reject) => {
    const deleteGroupQuery = "DELETE FROM `groups` WHERE `groupId` = ?";
    pool.query(deleteGroupQuery, [groupId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

// find group by name
// db.findGroupByName = (groupName) => {
//   return new Promise((resolve, reject) => {
//     const findGroupByNameQuery = "SELECT * FROM `groups` WHERE `groupName` = ?";
//     pool.query(findGroupByNameQuery, [groupName], (err, result) => {
//       if (err) {
//         return reject(err);
//       } else {
//         return resolve(result);
//       }
//     });
//   });
// };

// find group by id
db.findGroupById = (groupId) => {
  return new Promise((resolve, reject) => {
    const findGroupByIdQuery = "SELECT * FROM `groups` WHERE `groupId` = ?";
    pool.query(findGroupByIdQuery, [groupId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

module.exports = db;
