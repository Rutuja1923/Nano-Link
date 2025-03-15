const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    // const userUid = req.cookies?.uid;

    //Checking Headers for Bearer Token
    const userUid = req.headers['authorization'];

    if (!userUid || !userUid.startsWith("Bearer ")) {
        return res.redirect('/login');
    }

    const token = userUid.split("Bearer ")[1];

    try {
        const user = getUser(token);

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
    //const userUid = req.cookies?.uid;

    //Checking Headers for Bearer Token
    const userUid = req.headers['authorization'];

    if (!userUid || !userUid.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }

    const token = userUid.split("Bearer ")[1];

    try {
        const user = getUser(token);
        req.user = user;
        next();
    } 
    catch (error) {
        console.error("Error during token verification:", error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

module.exports = { restrictToLoggedinUserOnly, checkAuth };
