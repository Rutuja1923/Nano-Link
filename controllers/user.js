const {v4: uuidv4} = require('uuid');
const User = require('../models/User');
const {setUser} = require('../service/auth');

async function handleUserSignup(req, res) {
    const {name, email, password} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.render("signup", { error: "Email already in use!" });
    }
    
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect('/login');
}

async function handleUserLogin(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({
        email: email,
        password: password,
    });
    if (!user) {
        return res.render('login', {
            error: "Invalid username or password",
        });
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    return res.redirect('/');
}

module.exports = {handleUserSignup, handleUserLogin};