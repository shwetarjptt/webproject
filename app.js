const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');

dotenv.config({ path: './config.env'});
require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

app.use(require('./router/auth'));

const PORT = process.env.POST || 5000;



app.use(express.static(path.join(__dirname, "./my-app/build/index.html")));

app.get("*", function (req, res){
    res.sendFile(
        path.join(__dirname, "./my-app/build/index.html"),
        function (err){
            res.status(500).send(err);
        }
    );
});

//Middelware

// const middleware = (req,res, next) => {
//     console.log(`hello my middleware`);
//     next();
// }

// app.get('/', (req, res) => {
//     res.send(`hello world from the server`);
// });

// app.get('/about', (req, res) => {
//     console.log(`hello my about middleware`);
//     res.send(`hello about from the server`);
// });

// app.get('/contact', (req, res) => {
   
//     res.send(`hello contact from the server`);
// })

app.get('/signin', (req, res) => {
    res.send(`hello singin from the server`);
})

app.get('/signup', (req, res) => {
    res.send(`hello singup from the serversscd`);
})

// 3:step heroku

if(process.env.NODE_ENV == "production"){
    app.use(expess.static("my-app/build"));
}

app.listen(PORT, () => {
    console.log(`server is runnig at port noo ${PORT}`)
})