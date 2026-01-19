const queries = require("../../crudOperations/Scrapbooks/scrapbooksCRUD.js");
const { uploadImage, decode } = require("../../functions/index.js");


const createScrapbook = async (req, res) => {
    console.log("Hello")
  try {
    let { coverPhoto } = req.body;
    const {
      name,
      caption,
      lattitude,
      longitude,
      contentFlag,
      userId,
      templateId,
    } = req.body;
    coverPhoto = uploadImage(decode(coverPhoto), userId);

    console.log(coverPhoto);
    if (!userId || !name || !templateId) {
        console.log(name,userId,contentFlag,templateId)
        console.log("hello in if")
      return res.status(400).json({
        status: "error",
        message: "userId, name, contentType, templateId are required",
        body: {
          userId: userId,
          name: name,
          contentFlag: contentFlag,
          templateId: templateId,
        },
      });
    }

    console.log("hello")
    try {
        const newScrapbook = await queries.createScrapbook(
      userId,
      name,
      caption,
      lattitude,
      longitude,
      contentFlag,
      coverPhoto,
      templateId
    );
        console.log(newScrapbook);
        return res.status(200).json(newScrapbook);
        }
        catch(err)
        {
            console.log(err)
        }

  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error creating new scrapbook",
      body: {
        error: err,
      },
    });
  }
};

const updateScrapbook = async (req, res) => {
  try {
    const { scrapId } = req.params;
    const { name, caption, lattitude, longitude, contentFlag, coverPhoto } =
      req.body;
    let editTime = Date.now();
    if (!scrapId) {
      return res.status(400).json({
        status: "error",
        message: "scrapId is required",
        body: {
          scrapId: scrapId,
        },
      });
    }
    const updatedScrapbook = await queries.updateScrapbook(
      scrapId,
      name,
      caption,
      lattitude,
      longitude,
      editTime,
      contentFlag,
      coverPhoto
    );
    res.status(200).json({
      status: "success",
      message: "Scrapbook updated successfully",
      body: {
        scrapbook: updatedScrapbook,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error updating scrapbook",
      body: {
        error: err.message,
      },
    });
  }
};

const getScrapbook = async (req, res) => {
  try {
    const { scrapId } = req.params;
    if (!scrapId) {
      return res.status(400).json({
        status: "error",
        message: "scrapId is required",
        body: {
          scrapId: scrapId,
        },
      });
    }
    const scrapbook = await queries.getScrapbook(scrapId);
    res.status(200).json({
      status: "success",
      message: "Scrapbook fetched successfully",
      body: {
        scrapbook: scrapbook,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error fetching scrapbook",
      body: {
        error: err,
      },
    });
  }
};

const getAllUserScrapbooks = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json("userId is required");
    }
    const scrapbooks = await queries.getAllUserScrapbooks(userId);
    res.status(200).json(scrapbooks);
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error fetching scrapbooks",
      body: {
        error: err,
      },
    });
  }
};

const deleteScrapbook = async (req, res) => {
  try {
    const { scrapId } = req.params;
    if (!scrapId) {
      return res.status(400).json("scrapId is required");


    }
    const deletedScrapbook = await queries.deleteScrapbookById(scrapId);
    console.log(deletedScrapbook);
    if (deletedScrapbook.affectedRows == 1) {
      return res.status(200).json("Scrapbook deleted successfully");
    }

  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error deleting scrapbook",
      body: {
        error: err,
      },
    });
  }
};

const deleteAllUserScrapbooks = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        status: "error",
        message: "userId is required",
        body: {
          userId: userId,
        },
      });
    }
    const deletedScrapbooks = await queries.deleteAllUserScrapbooks(userId);
    res.status(200).json({
      status: "success",
      message: "Scrapbooks deleted successfully",
      body: {
        scrapbooks: deletedScrapbooks,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error deleting scrapbooks",
      body: {
        error: err,
      },
    });
  }
};

const getFictionalScrapbooks = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        status: "error",
        message: "userId is required",
        body: {
          userId: userId,
        },
      });
    }
    const scrapbooks = await queries.getFictionalScrapbooks(userId);
    res.status(200).json({
      status: "success",
      message: "Scrapbooks fetched successfully",
      body: {
        scrapbooks: scrapbooks,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error fetching scrapbooks",
      body: {
        error: err.message,
      },
    });
  }
};

const getOpinionScrapbooks = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        status: "error",
        message: "userId is required",
        body: {
          userId: userId,
        },
      });
    }
    const scrapbooks = await queries.getOpinionScrapbooks(userId);
    res.status(200).json({
      status: "success",
      message: "Scrapbooks fetched successfully",
      body: {
        scrapbooks: scrapbooks,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error fetching scrapbooks",
      body: {
        error: err.message,
      },
    });
  }
};

module.exports = {
  createScrapbook,
  updateScrapbook,
  getScrapbook,
  getAllUserScrapbooks,
  deleteScrapbook,
  deleteAllUserScrapbooks,
  getFictionalScrapbooks,
  getOpinionScrapbooks,
};
