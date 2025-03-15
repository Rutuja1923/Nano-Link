const express = require('express');
const URL = require('../models/Url');
const router = express.Router();
const {restrictTo} = require("../middlewares/auth");

router.get('/', restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const allURLs = await URL.find({
        createdBy: req.user._id
    });

    return res.render('home', { 
        id: req.query.id || null,
        url: req.query.url || '', 
        urls: allURLs,
    });
});

router.get('/admin/urls', restrictTo(["ADMIN"]), async (req, res) => {
    const allURLs = await URL.find({});
    
    return res.render('home', {  
        urls: allURLs,
        id: req.user ? req.user._id : null
    });
});

router.get('/signup', (req,res) => {
    return res.render('signup');
});

router.get('/login', (req,res) => {
    return res.render('login');
});

router.get("/logout", (req, res) => {
    res.clearCookie("token")

    return res.redirect("/login");
});

module.exports = router;