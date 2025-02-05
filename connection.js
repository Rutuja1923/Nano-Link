const mongoose = require('mongoose');

async function connectMongoDB(url) {
    return mongoose
        .connect(url)
        .then( () => {
            console.log(`MongoDB connected!`);
        })
        .catch( (err) => {
            console.error(`Mongo Error: ${err.message}`);
        });
}

module.exports = {connectMongoDB};