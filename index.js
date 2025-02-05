const express = require('express');

const {connectMongoDB} = require('./connection');

const urlRoute = require('./routes/url');

const PORT = 3000;
const app = express();

//DB connection
const url = 'mongodb://127.0.0.1:27017/short-url';
connectMongoDB(url);

//middleware
app.use(express.json());

//initialize router
app.use('/url',urlRoute);

//start the server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

