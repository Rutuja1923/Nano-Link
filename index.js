const express = require('express');
const path = require('path');

const {connectMongoDB} = require('./connection');

const urlRoute = require('./routes/url');

const PORT = 3000;
const app = express();

//DB connection
const url = 'mongodb://127.0.0.1:27017/short-url';
connectMongoDB(url);

//set view engine and path to ejs files
app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));

//middleware
app.use(express.json());

//initialize router
app.use('/url',urlRoute);

//server side rendering using ejs templating
app.get('/home', async (req,res) => {
    const URL = require('./models/Url');
    const allURLs = await URL.find({});
    return res.render('home', {
        urls: allURLs,
    });
});

//start the server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

