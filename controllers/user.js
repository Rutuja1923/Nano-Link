const User = require('../models/User');
const {setUser} = require('../service/auth');

async function handleUserSignup(req, res) {
    const {name, email, password} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.render("signup", { error: "Email already in use!" });
    }
    
    const user = await User.create({
        name,
        email,
        password,
    });
    await user.save();

    return res.redirect('/login');
}

async function handleUserLogin(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({
        email: email,
    });

    if (!user || !(await user.comparePassword(password))) {
        return res.render('login', { 
            error: "Invalid username or password"
        });
    }

    const token = setUser(user);
    res.cookie('token', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production'
    });
    return res.redirect('/');
}

module.exports = {handleUserSignup, handleUserLogin};