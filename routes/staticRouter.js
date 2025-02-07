const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const id = req.query.id || null;
    return res.render('home', { 
        id: req.query.id || null,
        url: req.query.url || '', 
    });
});

module.exports = router;