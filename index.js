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

//simple rendering 
app.get('/test', async (req,res) => {
    const URL = require('./models/Url');
    const allURLs = await URL.find({});
    return res.end(
        `
        <html>
            <head>
                <title>Short URLs</title>
            </head>
            <body>
                <h1>All Short URLs</h1>
                <ol>
                    ${allURLs.map(shortUrl => 
                        `<li>${shortUrl.shortID} - ${shortUrl.redirectURL} - ${shortUrl.visitHistory.length}</li>`
                    ).join('')}
                </ol>
            </body>
        </html>
        `
    );
});

//start the server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

