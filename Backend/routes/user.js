const express = require('express');
const {check} = require('express-validator');
const app = express();
const router = express.Router();

const {createUser}=require('../controllers/user');
const { validateUserSignUp, userValidation } = require('../middlewares/validation/user');



router.post('/create-user',validateUserSignUp,userValidation,createUser);

module.exports = router;