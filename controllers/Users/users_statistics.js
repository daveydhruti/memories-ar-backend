const queries = require("../../crudOperations/Users/users_statistics");

const totalNumberOfUsers = async (req, res) => {
  try {
    const data = await queries.totalNumberOfUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const totalNumberOfActiveUsers = async (req, res) => {
  try {
    const data = await queries.totalNumberOfActiveUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const totalNumberOfDeactivatedUsers = async (req, res) => {
  try {
    const data = await queries.totalNumberOfDeactivatedUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const totalNumberOfBannedUsers = async (req, res) => {
  try {
    const data = await queries.totalNumberOfBannedUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const numberOfReportedUsers = async (req, res) => {
  try {
    const data = await queries.numberOfReportedUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const numberOfReportedPosts = async (req, res) => {
  try {
    const data = await queries.numberOfReportedPosts();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const totalNumberOfFriends = async (req, res) => {
  try {
    const data = await queries.totalNumberOfFriends();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const totalNumberOfPosts = async (req, res) => {
  try {
    const data = await queries.totalNumberOfPosts();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const numberOfUserFriends = async (req, res) => {
  id = req.body.id;
  try {
    const data = await queries.numberOfUserFriends(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const numberOfUserPosts = async (req, res) => {
  id = req.body.id;
  try {
    const data = await queries.numberOfUserPosts(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const date = require("../../utils/date.js");
const getStats = async (req, res) => {
  const todayActiveUsers = await queries.getActiveUsersByDate(
    date.today.start,
    date.today.end
  );
  const todayDeactivatedUsers = await queries.getDeactivatedUsersByDate(
    date.today.start,
    date.today.end
  );
  const todayBannedUsers = await queries.getBannedUsersByDate(
    date.today.start,
    date.today.end
  );
  const yesterdayActiveUsers = await queries.getActiveUsersByDate(
    date.yesterday.start,
    date.yesterday.end
  );
  const yesterdayDeactivatedUsers = await queries.getDeactivatedUsersByDate(
    date.yesterday.start,
    date.yesterday.end
  );
  const yesterdayBannedUsers = await queries.getBannedUsersByDate(
    date.yesterday.start,
    date.yesterday.end
  );
  const thisMonthActiveUsers = await queries.getActiveUsersByDate(
    date.thisMonth.start,
    date.thisMonth.end
  );
  const thisMonthDeactivatedUsers = await queries.getDeactivatedUsersByDate(
    date.thisMonth.start,
    date.thisMonth.end
  );
  const thisMonthBannedUsers = await queries.getBannedUsersByDate(
    date.thisMonth.start,
    date.thisMonth.end
  );
  const lastMonthActiveUsers = await queries.getActiveUsersByDate(
    date.lastMonth.start,
    date.lastMonth.end
  );
  const lastMonthDeactivatedUsers = await queries.getDeactivatedUsersByDate(
    date.lastMonth.start,
    date.lastMonth.end
  );
  const lastMonthBannedUsers = await queries.getBannedUsersByDate(
    date.lastMonth.start,
    date.lastMonth.end
  );
  const thisYearActiveUsers = await queries.getActiveUsersByDate(
    date.thisYear.start,
    date.thisYear.end
  );
  const thisYearDeactivatedUsers = await queries.getDeactivatedUsersByDate(
    date.thisYear.start,
    date.thisYear.end
  );
  const thisYearBannedUsers = await queries.getBannedUsersByDate(
    date.thisYear.start,
    date.thisYear.end
  );
  const lastYearActiveUsers = await queries.getActiveUsersByDate(
    date.lastYear.start,
    date.lastYear.end
  );
  const lastYearDeactivatedUsers = await queries.getDeactivatedUsersByDate(
    date.lastYear.start,
    date.lastYear.end
  );
  const lastYearBannedUsers = await queries.getBannedUsersByDate(
    date.lastYear.start,
    date.lastYear.end
  );
  const stats = {
    today: {
      activeUsers: todayActiveUsers[0].activeUsersByDate,
      deactivatedUsers: todayDeactivatedUsers[0].deactivatedUsersByDate,
      bannedUsers: todayBannedUsers[0].bannedUsersByDate,
    },
    yesterday: {
      activeUsers: yesterdayActiveUsers[0].activeUsersByDate,
      deactivatedUsers: yesterdayDeactivatedUsers[0].deactivatedUsersByDate,
      bannedUsers: yesterdayBannedUsers[0].bannedUsersByDate,
    },
    thisMonth: {
      activeUsers: thisMonthActiveUsers[0].activeUsersByDate,
      deactivatedUsers: thisMonthDeactivatedUsers[0].deactivatedUsersByDate,
      bannedUsers: thisMonthBannedUsers[0].bannedUsersByDate,
    },
    lastMonth: {
      activeUsers: lastMonthActiveUsers[0].activeUsersByDate,
      deactivatedUsers: lastMonthDeactivatedUsers[0].deactivatedUsersByDate,
      bannedUsers: lastMonthBannedUsers[0].bannedUsersByDate,
    },
    thisYear: {
      activeUsers: thisYearActiveUsers[0].activeUsersByDate,
      deactivatedUsers: thisYearDeactivatedUsers[0].deactivatedUsersByDate,
      bannedUsers: thisYearBannedUsers[0].bannedUsersByDate,
    },
    lastYear: {
      activeUsers: lastYearActiveUsers[0].activeUsersByDate,
      deactivatedUsers: lastYearDeactivatedUsers[0].deactivatedUsersByDate,
      bannedUsers: lastYearBannedUsers[0].bannedUsersByDate,
    },
  };
  return res.status(200).json(stats);
};

module.exports = {
  totalNumberOfUsers,
  totalNumberOfActiveUsers,
  totalNumberOfDeactivatedUsers,
  totalNumberOfBannedUsers,
  totalNumberOfFriends,
  totalNumberOfPosts,
  numberOfReportedUsers,
  numberOfReportedPosts,
  numberOfUserFriends,
  numberOfUserPosts,
  getStats,
};
