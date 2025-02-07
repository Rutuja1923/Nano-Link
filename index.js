const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const {connectMongoDB} = require('./connection');

//require routes
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

//require middleware
const {restrictToLoggedinUserOnly} = require('./middlewares/auth');

const PORT = 3000;
const app = express(); // express application object

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
app.use(cookieParser());

//initialize router
app.use('/url', restrictToLoggedinUserOnly, urlRoute);
app.use('/',staticRoute);
app.use('/user',userRoute);

//start the server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

