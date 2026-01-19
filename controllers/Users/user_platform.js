const queries = require("../../crudOperations/Users/user_platform.js");

const themes = async (req, res) => {
  try {
    const data = await queries.getThemes();
    res.status(200).json(data);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
};

const platformSettings = async (req, res) => {
  try {
    const data = await queries.getPlatformSettings();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const interests = async (req, res) => {
  try {
    const data = await queries.getInterests();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  themes,
  platformSettings,
  interests,
};
