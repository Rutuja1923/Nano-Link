//stateless authentication
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET = process.env.SECRET_KEY;

function setUser(user) {
    return jwt.sign({
            _id: user._id,
            email: user.email,
            role: user.role,
        }, 
        SECRET,
        { expiresIn: "1h" }
    );
}

async function getUser(token) {
    if (!token) {
        return null;
    }
    try {
        const decoded =  jwt.verify(token, SECRET);

        return User.findById(decoded._id).select('-password'); 
    } 
    catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
}

module.exports = {setUser, getUser};