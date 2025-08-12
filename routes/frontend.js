const express = require('express');
const router = express.Router();

const siteController = require('../controllers/siteController');
const loadCommonData = require('../middleware/loadCommenData');

router.use(loadCommonData);

router.get('/', siteController.index);
router.get('/category/:name', siteController.articleByCategory);
router.get('/single/:id', siteController.singleArticle);
router.get('/search', siteController.search);
router.get('/author/:id', siteController.author);
router.post('/single/:id/comment', siteController.addComment);


// 404 Middleware
router.use((req, res, next) => {
    res.status(404).render('404', { 
        message: 'Page not found'
    })
});

// 500 Error
router.use((error, req, res, next) => {
    console.error(error.stack);
    const status = error.status || 500;
    
    res.status(status).render('errors', { 
        message: error.message || 'Something went wrong',
        status
    });
});

module.exports = router;

