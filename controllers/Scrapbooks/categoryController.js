const queries = require("../../crudOperations/Scrapbooks/categoriesCRUD.js");

const createCategory = async (req, res) => {
    const { categoryName } = req.body;
    if(!categoryName){
        res.status(400).json({
            status: "error",
            message: "Please provide all required fields",
            body: {
                categoryName: categoryName
            }
        });
    }
    try {
        const newCategory = await queries.createCategory(categoryName);
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error creating new category",
            body: {
                error: err
            }
        });
    }
};

const getCategory = async (req, res) => {
    const { categoryId } = req.params;
    if(!categoryId){
        res.status(400).json({
            status: "error",
            message: "Please provide all required fields",
            body: {
                categoryId: categoryId
            }
        });
    }
    try {
        const category = await queries.getCategory(categoryId);
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error retrieving category",
            body: {
                error: err
            }
        });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await queries.getAllCategories();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error retrieving categories",
            body: {
                error: err
            }
        });
    }
};

const updateCategory = async (req, res) => {
    const {categoryName} = req.body;
    const { categoryId } = req.params;
    if(!categoryName || !categoryId){
        res.status(400).json({
            status: "error",
            message: "Please provide all required fields",
            body: {
                categoryName: categoryName,
                categoryId: categoryId
            }
        });
    }
    try {
        const updatedCategory = await queries.updateCategory(categoryName, categoryId);
        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error updating category",
            body: {
                error: err
            }
        });
    }
};

const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    if(!categoryId){
        res.status(400).json({
            status: "error",
            message: "Please provide all required fields",
            body: {
                categoryId: categoryId
            }
        });
    }
    try {
        const deletedCategory = await queries.deleteCategory(categoryId);
        res.status(200).json("category deleted successfully");
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error deleting category",
            body: {
                error: err
            }
        });
    }
};


module.exports = { createCategory, getCategory, getAllCategories, updateCategory, deleteCategory }