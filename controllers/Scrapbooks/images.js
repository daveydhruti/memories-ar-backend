const queries = require("../../crudOperations/Scrapbooks/images.js");
const { uploadImage, decode } = require("../../functions/index.js");
const UUID = require("uuid-v4");

const addImages = async (req, res) => {
  try {
    const { array } = req.body;
    for (let i = 0; i < array.length; i++) {
      const uuid = UUID();
      let link = uploadImage(decode(array[i].image), uuid);
      const result = await queries.AddImage(array[i].scrapId, link, array[i].textHeading);
    }
    res.status(200).json("images uploaded successfully");
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error adding image",
      body: {
        error: error,
      },
    });
  }
};

const addImage = async (req, res) => {
  console.log("Hello in addd image");
  try {
    const { scrapId, image, textHeading } = req.body;
    const uuid = UUID();
    let link = uploadImage(decode(image), uuid);
    const result = await queries.AddImage(scrapId, link, textHeading);
    console.log(result)
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error adding image",
      body: {
        error: error,
      },
    });
  }
};

const getImage = async (req, res) => {
  try {
    const { pictureId } = req.params;
    const result = await queries.GetImage(pictureId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error retrieving image",
      body: {
        error: error,
      },
    });
  }
};

const getImageByScrapId = async (req, res) => {
  try {
    const { scrapId } = req.params;
    const result = await queries.GetImageByScrapId(scrapId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error retrieving image",
      body: {
        error: error,
      },
    });
  }
};

const updateImage = async (req, res) => {
  try {
    const { pictureId } = req.params;
    const { link, textHeading } = req.body;
    const result = await queries.UpdateImage(pictureId, link, textHeading);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error updating image",
      body: {
        error: error,
      },
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { pictureId } = req.params;
    const result = await queries.DeleteImage(pictureId);
    res.status(200).json("Image deleted");
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting image",
      body: {
        error: error,
      },
    });
  }
};

const deleteAllScrapImages = async (req, res) => {
  try {
    const { scrapId } = req.params;
    const result = await queries.deleteAllScrapImages(scrapId);
    res.status(200).json("Images deleted");
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting images",
      body: {
        error: error,
      },
    });
  }
};

module.exports = {
  addImage,
  getImage,
  getImageByScrapId,
  updateImage,
  deleteImage,
  deleteAllScrapImages,
  addImages,
};
