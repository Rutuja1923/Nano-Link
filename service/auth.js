//stateless authentication
const jwt = require('jsonwebtoken');

require("dotenv").config();
const SECRET = process.env.SECRET_KEY;

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, SECRET);
}

function getUser(token) {
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, SECRET);
    } 
    catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
}

module.exports = {setUser, getUser};