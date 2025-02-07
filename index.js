const express = require('express');
const path = require('path');

const {connectMongoDB} = require('./connection');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');

const PORT = 3000;
const app = express();

//DB connection
const url = 'mongodb://127.0.0.1:27017/short-url';
connectMongoDB(url);

//set view engine and path to ejs files
app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

//middleware
app.use(express.json());
app.use(express.urlencoded( {extended: false} ));

//initialize router
app.use('/url',urlRoute);
app.use('/',staticRoute);

//start the server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

