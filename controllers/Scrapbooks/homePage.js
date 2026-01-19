const queries = require("../../crudOperations/Scrapbooks/homePage.js");

const homePage = async (req, res) => {
  const userId = req.params.id;
  console.log(userId)
  if (!userId) {
    return res.status(400).json("Invalid Details");
  }
  try {
    const result = await queries.getAllScrapbooks(userId);
    if (result) {
      return res.status(200).json(JSON.parse(JSON.stringify(result)));
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { homePage };
