
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    avatar: Buffer,
})
userSchema.statics.isThisEmailInUse = async function (email) {
    if(!email) throw new Error('invalid email');
    try {
        const user = await this.findOne({ email });
        if (user) return false
        return true;
    } catch (err) {
        console.log('error inside',error.message);
        return false;
    }
}
module.exports = mongoose.model('User', userSchema);
