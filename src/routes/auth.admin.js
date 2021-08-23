const express = require('express');
const { signup, signin, allUser, allAdmin, signout, deleteUser } = require('../controllers/auth');
const { createUserValidator, isRequestValidated, validateLogin } = require('../validators/auth.validator');
const { checkDuplicateUsernameOrEmail } = require('../common-middleware/verifysignup');
const { verifyToken } = require('../common-middleware/auth.jwt');
const router = express.Router();


router.post('/admin/signup', createUserValidator, isRequestValidated,checkDuplicateUsernameOrEmail, signup);
router.post('/admin/signin', validateLogin, isRequestValidated, signin);
router.get('/admin/userAll', allUser);
router.get('/admin/adminAll',verifyToken,allAdmin);
router.post( '/admin/user', verifyToken);
router.post('/admin/signout', signout);
router.delete('/admin/deleteUser', deleteUser);


module.exports = router;