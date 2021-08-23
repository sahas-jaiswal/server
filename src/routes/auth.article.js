const express = require('express');
const { upload } = require('../common-middleware');
const { verifyToken } = require('../common-middleware/auth.jwt');
const { createArticle, getArticle, deleteArticle, updateArticle } = require('../controllers/article');
const router = express.Router();

router.post('/article/createArticle', verifyToken,upload.array('articlePictures',3), createArticle);
router.get('/article/getArticle', getArticle);
router.delete('/article/deleteArticle/:id', verifyToken, deleteArticle);
router.put('/article/updateArticle/:id', verifyToken,upload.array('articlePictures'), updateArticle);

module.exports = router;