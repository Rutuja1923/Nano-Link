const express = require('express');
const URL = require('../models/Url');
const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    const allURLs = await URL.find({
        createdBy: req.user._id
    });
    return res.render('home', { 
        id: req.query.id || null,
        url: req.query.url || '', 
        urls: allURLs,
    });
});

router.get('/signup', (req,res) => {
    return res.render('signup');
});

router.get('/login', (req,res) => {
    return res.render('login');
});

module.exports = router;