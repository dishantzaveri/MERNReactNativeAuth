console.log("Starting   server   on   port   3000");
const express = require('express');
const app = express();
require('./models/db');

const userRouter = require('./routes/user');


// app.use((req, res, next) => {
//     req.on('data', (chunk) => {
//         const data = JSON.parse(chunk);
//         req.body = data;
//         next();
//     });


// });   // middleware))

app.use(express.json());
app.use(userRouter)

app.get('/test', (req, res) => {
    res.send('Hello World');
})

require('dotenv').config();



app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.listen(3000, (err) => {
    if (err) {
        console.log("Error   starting   server");
    }
    console.log("Server   started   on   port   3000");
}); 