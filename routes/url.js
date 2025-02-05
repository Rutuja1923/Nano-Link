const express = require('express');

const {handleGenerateNewShortURL, handleRedirectShortURL, handleGetAnalytics} = require('../controllers')

const router = express.Router();

router.post('/', handleGenerateNewShortURL);
router.get('/:id',handleRedirectShortURL);
router.get('/analytics/:id', handleGetAnalytics);

module.exports = router;

