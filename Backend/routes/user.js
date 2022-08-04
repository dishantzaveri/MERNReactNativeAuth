const express = require('express');
const sharp = require('sharp');
const router = express.Router();
const {
  createUser,
  userSignIn,
  uploadProfile,
  signOut,
} = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn,
} = require('../middlewares/validation/user');

const multer = require('multer');
const User = require('../models/user');
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};
const uploads = multer({ storage, fileFilter });

router.post('/create-user', validateUserSignUp, userVlidation, createUser);
router.post('/sign-in', validateUserSignIn, userVlidation, userSignIn);
router.post('/sign-out', isAuth, signOut);
router.post(
  '/upload-profile',
  isAuth,
  uploads.single('profile'),
  uploadProfile
  //  async (req, res) => {
  //   const { user } = req
  //   if (!user)
  //     return res
  //       .status(401)
  //       .json({ success: false, message: 'unauthorized access!' });

  //   try {
  //     const profileBuffer = req.file.buffer;
  //     const { width, height } = await sharp(profileBuffer).metadata();
  //     const avatar = await sharp(profileBuffer).resize(Math.round(width * 0.5), Math.round(height * 0.5)).toBuffer()

  //     // console.log(avatar)


  //     await User.findByIdAndUpdate(user._id, { avatar })
  //     res.status(201).json({ success: true, message: 'Your profile has updated!' })
  //   }

  //   catch (error) { 
  //     res.status(500).json({ success: false, message: 'server error baadmai try kar!' })
  //     console.log('Error while uploading profile image', error.message) }

  // }

);
module.exports = router;
