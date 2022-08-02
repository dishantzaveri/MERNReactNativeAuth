console.log("Starting   server   on   port   3000");
const express = require('express');
const app = express();
require('./models/db');

const User = require('./models/user');

require('dotenv').config();

app.post('/create-user', async (req, res) => {
    const isNewUser = await User.isThisEmailInUse('dishu@gmail.com');
    if (!isNewUser) return res.json({ success: false, message: 'email already in use , sign in karo bhai' });
    const user = await User({
        fullname: 'dishu',
        email: 'dishu@gmail.com',
        password: '1234444',
    });
    await user.save();
    res.json(user);
});

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.listen(3000, (err) => {
    if (err) {
        console.log("Error   starting   server");
    }
    console.log("Server   started   on   port   3000");
});