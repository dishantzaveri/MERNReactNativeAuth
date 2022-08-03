
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        minlength: 8,
        maxlength: 1024
    },
    avatar: Buffer,
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
       bcrypt.hash(this.password, 8,(err,hash) => {
        if(err) return next(err);
        this.password = hash;
        next();
       });
       
    }
});

userSchema.methods.comparePassword = async function(password){
    if(!password) throw new Error('invalid password');
   try{
    const result = await bcrypt.compare(password,this.password);
    return result;
    }catch(error){
        console.log('error inside', error.message);
   }
}

userSchema.statics.isThisEmailInUse = async function (email) {
    if (!email) throw new Error('invalid email');
    try {
        const user = await this.findOne({ email });
        if (user) return false
        return true;
    } catch (err) {
        console.log('error inside', error.message);
        return false;
    }
}
module.exports = mongoose.model('User', userSchema);
