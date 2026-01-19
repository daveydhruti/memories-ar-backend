const queries = require("../../crudOperations/Users/users");

const allUsers = async (req, res) => {
  try {
    const data = await queries.allUsers();
    return res.send(data);
    
  } catch (err) {
    return res.status(400).json(err);
  }
};

const allReportedUsers = async (req, res) => {
  try {
    const data = await queries.allReportedUsers();
    return res.send(data);
  } catch (err) {
    return res.status(400).json(err);
  }
};


module.exports = {
  allUsers,
  allReportedUsers, 
};
