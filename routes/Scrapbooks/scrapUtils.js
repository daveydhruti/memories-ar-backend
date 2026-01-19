const router = require('express').Router();
const comments = require('../../controllers/Scrapbooks/comments.js');
const likes = require('../../controllers/Scrapbooks/likes.js');
const dislikes = require('../../controllers/Scrapbooks/dislikes.js');
const savedScrapbooks = require('../../controllers/Scrapbooks/savedScrapbook.js');
const reportScrapbook = require('../../controllers/Scrapbooks/reportScrapbook.js');

//comment routes
router.post('/addComment', comments.addComment);
router.delete('/deleteComment', comments.deleteComment);
router.get('/getComments/:scrapId', comments.getAllComments);

// like routes
router.post('/addLike', likes.addLike);
router.get('/getScrapLikes', likes.getAllScrapLikes);
router.get('/getUserLikes', likes.getAllUserLikes);
router.delete('/unLike', likes.unLike);
router.get('/checkLike/:scrapId/:userId', likes.checkLike);

// dislike routes
router.post('/addDislike', dislikes.addDislike);
router.get('/getScrapDislikes', dislikes.getAllScrapDislikes);
router.get('/getUserDislikes', dislikes.getAllUserDislikes);
router.delete('/unDislike', dislikes.unDislike);

//save scrapbook routes
router.post('/saveScrapbook', savedScrapbooks.saveScrapbook);
router.get('/getSavedScrapbooks', savedScrapbooks.getSavedScrapbooks);
router.delete('/deleteSavedScrapbook', savedScrapbooks.deleteSavedScrapbook);
router.get('/checkSavedScrapbook/:userId/:scrapId', savedScrapbooks.checkSavedScrapbook)

//report scrapbook routes
router.post('/reportScrapbook', reportScrapbook.reportScrapbook);

module.exports = router;