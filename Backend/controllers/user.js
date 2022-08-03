
const User = require('../models/user');

exports.createUser = async(req, res) => {
    const { fullname, email, password } = req.body;

        const isNewUser = await User.isThisEmailInUse(email);
        if (!isNewUser) return res.json({ success: false, message: 'email already in use , sign in karo bhai' });
        const user = await User({
            fullname,
            email,
            password,
        });
        await user.save();
        res.json(user);
    }

    exports.userSignIn = async (req, res) => {
       const { email, password } = req.body;
      const user = await User.findOne({email})

      if(!user) return res.json({success: false, message: 'email not found'})

      const isMatch =await await user.comparePassword(password)
      if(!isMatch) return res.json({success: false, message: 'password is incorrect'})

      res.json({success: true, message: 'user signed in successfully'})
    }