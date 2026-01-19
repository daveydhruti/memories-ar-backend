const router = require("express").Router();
const template = require("../../controllers/Scrapbooks/TemplateController.js");
const category = require("../../controllers/Scrapbooks/categoryController.js");
const scrapbook = require("../../controllers/Scrapbooks/ScrapbooksController.js");
const image = require("../../controllers/Scrapbooks/images.js");
const { homePage } = require("../../controllers/Scrapbooks/homePage.js");

//template routes

router.post('/createTemplate', template.createTemplate);
router.get('/getTemplateById/:templateId', template.getTemplateById);
router.get('/getAllTemplates', template.getAllTemplates);
router.get('/getTemplatesByCategory/:categoryId', template.getTemplatesByCategory)
router.patch('/updateTemplate/:templateId', template.updateTemplate);
router.delete('/deleteTemplate/:templateId', template.deleteTemplate);


//category routes
router.post("/createCategory", category.createCategory);
router.get("/getCategory/:categoryId", category.getCategory);
router.get("/getAllCategories", category.getAllCategories);
router.patch("/updateCategory/:categoryId", category.updateCategory);
router.delete("/deleteCategory/:categoryId", category.deleteCategory);

//scrapbook routes
router.post('/createScrapbook', scrapbook.createScrapbook);
router.patch('/updateScrapbook/:scrapId', scrapbook.updateScrapbook);
router.get('/getScrapbookById/:scrapId', scrapbook.getScrapbook);
router.get('/getAllScrapbooks/:userId', scrapbook.getAllUserScrapbooks);
router.get('/getFictionalScrapbooks/:userId', scrapbook.getFictionalScrapbooks);
router.get('/getOpinionScrapbooks/:userId', scrapbook.getOpinionScrapbooks);
router.delete('/deleteScrapbook/:scrapId', scrapbook.deleteScrapbook);
router.delete('/deleteAllScrapbooks/:userId', scrapbook.deleteAllUserScrapbooks);

//image routes
router.post("/addImage", image.addImage);
router.get("/getImage/:pictureId", image.getImage);
router.get("/getAllScrapImages/:scrapId", image.getImageByScrapId);
router.patch("/updateImage/:pictureId", image.updateImage);
router.delete("/deleteImage/:pictureId", image.deleteImage);
router.delete("/deleteAllScrapImages/:scrapId", image.deleteAllScrapImages);

//home page
router.get("/userFeed/:id", homePage);

module.exports = router;
