const {nanoid} = require('nanoid');
const UAParser = require('ua-parser-js');
const URL = require('../models/Url');

async function handleGenerateNewShortURL(req,res) {
    try {
        const body = req.body;
        if (!body.url) {
            return res.status(400).json(
                {
                    status : "error",
                    message : "URL is required"
                }
            );
        }

        const shortID = nanoid(8);
        await URL.create(
            {
                shortID: shortID,
                redirectURL: body.url,
                visitHistory: []
            }
        );

        return res.status(201).json(
            {
                status : "success",
                message : "Short ID generated",
                id: shortID
            }
        );    
    }
    catch (error) {
        console.error("Error generating short URL:", error);
        return res.status(500).json(
            {
                status: "error",
                message: "Failed to Generate Short ID"
            }
        );
    }
}

async function handleRedirectShortURL(req,res) {
    try {
        const shortID = req.params.id;
        const parser = new UAParser(req.headers['user-agent']);
        const result = parser.getResult();

        const entry = await URL.findOneAndUpdate(
            { shortID },
            {
                $push: {
                    visitHistory: {
                        timeStamp: new Date(),
                        ipAddress: req.headers['x-forwarded-for'] || req.ip,
                        device: `${result.os.name || 'Unknown'} ${result.os.version || ''}`.trim(),
                        browser:  result.browser.name || 'Unknown',
                    }
                }
            },
            { new: true }
        );
        if (!entry) {
            return res.status(404).json({
                status: "error",
                message: "Short URL not found"
            });
        }

        res.redirect(entry.redirectURL);
    }
    catch (error) {
        console.error("Error in redirecting:", error);
        return res.status(500).json(
            {
                status: "error",
                message: "Internal server error"
            }
        );
    }   
}

async function handleGetAnalytics(req,res) {
    try {
        const shortID = req.params.id;
        const result = await URL.findOne({ shortID });

        if (!result) {
            return res.status(404).json({
                status: "error",
                message: "Short URL not found"
            });
        }
        return res.status(200).json(
            {
                status: "success",
                totalClicks: result.visitHistory.length,
                analytics: result.visitHistory
            }
        );
    }
    catch (error) {
        console.error("Error fetching analytics:", error);
        return res.status(500).json(
            {
                status: "error",
                message: "Internal server error"
            }
        );
    }
}

module.exports = {handleGenerateNewShortURL, handleRedirectShortURL, handleGetAnalytics};