const queries = require("../../crudOperations/Themes/theme.js");

const addThemes = async (req, res) => {
  try {
    const { darkClr, textDarkClr, lightClr, textLightClr, midClr, textMidClr } =
      req.body;
    const array = [darkClr, textDarkClr, lightClr, textLightClr, midClr, textMidClr,];
    await queries.addThemes(array);
    return res.status(200).json("Themes Added Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getThemes = async (req, res) => {
  try {
    const data = await queries.getThemes();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const editTheme = async (req, res) => {
  try {
    const {
      themeId,
      darkClr,
      textDarkClr,
      lightClr,
      textLightClr,
      midClr,
      textMidClr,
    } = req.body;
    if (!themeId) {
      return res.status(400).json("No themeId provided");
    }
    if (
      !darkClr &&
      !textDarkClr &&
      !lightClr &&
      !textLightClr &&
      !midClr &&
      !textMidClr
    ) {
      return res.status(400).json("No queries to be edited");
    }
    let editThemeQuery = "UPDATE `account_themes` SET ";
    let bool = false;
    let fields = [];
    if (darkClr) {
      editThemeQuery += "`darkClr` = ?";
      bool = true;
      fields.push(darkClr);
    }
    if (textDarkClr) {
      if (bool) {
        editThemeQuery += ", ";
      }
      editThemeQuery += "`textDarkClr` = ?";
      bool = true;
      fields.push(textDarkClr);
    }
    if (lightClr) {
      if (bool) {
        editThemeQuery += ", ";
      }
      editThemeQuery += "`lightClr` = ?";
      bool = true;
      fields.push(lightClr);
    }
    if (textLightClr) {
      if (bool) {
        editThemeQuery += ", ";
      }
      editThemeQuery += "`textLightClr` = ?";
      bool = true;
      fields.push(textLightClr);
    }
    if (midClr) {
      if (bool) {
        editThemeQuery += ", ";
      }
      editThemeQuery += "`midClr` = ?";
      bool = true;
      fields.push(midClr);
    }
    if (textMidClr) {
      if (bool) {
        editThemeQuery += ", ";
      }
      editThemeQuery += "`textMidClr` = ?";
      fields.push(textMidClr);
    }
    editThemeQuery += " WHERE `themeId` = " + themeId;
    const result = await queries.editTheme(editThemeQuery, fields);
    return res.status(200).json("Theme updated successfully.");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteTheme = async (req, res) => {
  try {
    const { themeId } = req.body;
    await queries.deleteTheme(themeId);
    return res.status(200).json("Theme deleted successfully.");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const selectUserTheme = async (req, res) => {
  try {
    const { userId, themeId } = req.body;
    if (!userId) {
      return res.status(400).json("No userId provided");
    }
    if (!themeId) {
      return res.status(400).json("No themeId provided");
    }
    await queries.changeUserTheme(themeId, userId);
    return res.status(200).json("Theme changed successfully.");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUserTheme = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json("No userId provided");
    }
    const data = await queries.getUserTheme(userId);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};


module.exports = {
  addThemes,
  getThemes,
  editTheme,
  deleteTheme,
  selectUserTheme,
  getUserTheme,
};
