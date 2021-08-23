const express = require('express');
const { verifyToken } = require('../common-middleware/auth.jwt');
const router = express.Router();
const { addCategory, allCategory, updateCategory, deleteCategory, deleteAllWithCategory } =require('../controllers/category');
const { validatecreateCategory, isRequestValidated } = require('../validators/auth.validator');


router.post('/category/CategoryAdd', validatecreateCategory,isRequestValidated,verifyToken, addCategory);
router.get('/category/CategoryAll',allCategory);
router.put('/category/CategoryUpdate/:name',verifyToken, updateCategory);
router.delete('/category/CategoryDelete',validatecreateCategory,isRequestValidated,deleteCategory);
router.get('/category/CategoryAllWithDelete',deleteAllWithCategory);



module.exports = router;