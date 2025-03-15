const { getUser } = require("../service/auth");

async function checkForAuthentication (req, res, next) {
    const tokenCookie = req.cookies?.token;
    req.user = null ;

    if (tokenCookie) {
        const user = await getUser(tokenCookie);
        if (user) {
            req.user = user;
        }
    }

    console.log("User in checkForAuthentication:", req.user);
    
    return next();
}

function restrictTo(roles) {
    return function(req, res, next) {
        console.log("User in restrictTo:", req.user);
        if (!req.user) {
            return res.redirect("/login");
        }

        if (!roles.includes(req.user.role)) {
            return res.end("Unauthorized");
        }
        
        return next();
    }
}

module.exports = {checkForAuthentication, restrictTo};
