const queries = require("../../crudOperations/Scrapbooks/TemplateCRUD.js");

const createTemplate = async (req, res) => {
    const { templateName, templateDescription, categoryId } = req.body;
    if(!templateName || !templateDescription || !categoryId){
        res.status(400).json( "provide all required fields");
    }
    try {
        const newTemplate = await queries.createTemplate(templateName, templateDescription, categoryId);
        res.status(201).json({
            status: "success",
            message: "New template created",
            body: {
                template: newTemplate
            }
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error creating new template",
            body: {
                error: err
            }
        });
    }
};

const getTemplateById = async (req, res) => {
    const { templateId } = req.params;
    try {
        const template = await queries.getTemplateById(templateId);
        res.status(200).json({
            status: "success",
            message: "Template retrieved",
            body: {
                template: template
            }
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error retrieving template",
            body: {
                error: err
            }
        });
    }
};

const getAllTemplates = async (req, res) => {
    try {
        const templates = await queries.getAllTemplates();
        res.status(200).json({
            status: "success",
            message: "Templates retrieved",
            body: {
                templates: templates
            }
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error retrieving templates",
            body: {
                error: err
            }
        });
    }
};

const updateTemplate = async (req, res) => {
    const { templateId } = req.params;
    const { templateName, templateDescription, categoryId } = req.body;
    if(!templateId) {
        res.status(400).json({
            status: "error",
            message: "Please provide templateId",
            body: {
                templateId: templateId,
            }
        });
    }
    try {
        const updatedTemplate = await queries.updateTemplate(templateId, templateName, templateDescription, categoryId);
        res.status(200).json({
            status: "success",
            message: "Template updated",
            body: {
                template: updatedTemplate
            }
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error updating template",
            body: {
                error: err
            }
        });
    }
};

const deleteTemplate = async (req, res) => {
    const { templateId } = req.params;
    if(!templateId) {
        res.status(400).json({
            status: "error",
            message: "Please provide templateId",
            body: {
                templateId: templateId,
            }
        });
    }
    try {
        const deletedTemplate = await queries.deleteTemplate(templateId);
        res.status(200).json({
            status: "success",
            message: "Template deleted",
            body: {
                template: deletedTemplate
            }
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error deleting template",
            body: {
                error: err
            }
        });
    }
};

const getTemplatesByCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const template = await queries.getTemplatesByCategory(categoryId);
        res.status(200).json(template);
    } catch (err) {
        res.status(500).json("Error retrieving template");
    }
};

module.exports = {createTemplate, getTemplateById, getAllTemplates, updateTemplate, deleteTemplate, getTemplatesByCategory }