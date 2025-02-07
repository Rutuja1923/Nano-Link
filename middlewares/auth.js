const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;

    if (!userUid) {
        return res.redirect('/login');
    }

    try {
        const user = getUser(userUid);

        if (!user) {
            return res.redirect('/login');
        }

        req.user = user;
        next();
    } 
    catch (error) {
        console.error("Error during token verification:", error);
        return res.redirect('/login');
    }
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;

    try {
        const user = getUser(userUid);
        req.user = user;
        next();
    } 
    catch (error) {
        console.error("Error during token verification:", error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

module.exports = { restrictToLoggedinUserOnly, checkAuth };
