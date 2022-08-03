const express = require('express');
const {check} = require('express-validator');
const app = express();
const router = express.Router();

const {createUser, userSignIn}=require('../controllers/user');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middlewares/validation/user');



router.post('/create-user',validateUserSignUp,userValidation,createUser);
router.post('/sign-in',validateUserSignIn,userValidation,userSignIn)

module.exports = router;