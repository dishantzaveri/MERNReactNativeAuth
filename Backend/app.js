console.log("Starting   server   on   port   3000");
const express = require('express');
const app=express();

require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {

console.log("Connected to database");

}).catch(err => console.log("Error connecting to database", err));

app.get('/',(req, res) =>{
    res.send('<h1>Hello World!</h1>');
});

app.listen(3000,(err)=>{
    if(err){
        console.log("Error   starting   server");
    }
    console.log("Server   started   on   port   3000");
});