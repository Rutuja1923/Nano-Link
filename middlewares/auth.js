const { getUser } = require("../service/auth");

function checkForAuthentication (req, res, next) {
    const authorizationHeaderValue = req.headers["authorization"];
    req.user = null ;

    if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer ")) {
        return next();
    }

    const token = authorizationHeaderValue.split("Bearer ")[1];
    const user = getUser(token);

    req.user = user;
    return next();
}

// async function restrictToLoggedinUserOnly(req, res, next) {
//     // const userUid = req.cookies?.uid;

//     //Checking Headers for Bearer Token
//     const userUid = req.headers['authorization'];

//     if (!userUid || !userUid.startsWith("Bearer ")) {
//         return res.redirect('/login');
//     }

//     const token = userUid.split("Bearer ")[1];

//     try {
//         const user = getUser(token);

//         if (!user) {
//             return res.redirect('/login');
//         }

//         req.user = user;
//         next();
//     } 
//     catch (error) {
//         console.error("Error during token verification:", error);
//         return res.redirect('/login');
//     }
// } 

// async function checkAuth(req, res, next) {
//     //const userUid = req.cookies?.uid;

//     //Checking Headers for Bearer Token
//     const userUid = req.headers['authorization'];

//     if (!userUid || !userUid.startsWith("Bearer ")) {
//         return res.status(401).json({ message: 'Authorization header missing or invalid' });
//     }

//     const token = userUid.split("Bearer ")[1];

//     try {
//         const user = getUser(token);
//         req.user = user;
//         next();
//     } 
//     catch (error) {
//         console.error("Error during token verification:", error);
//         return res.status(401).json({ message: 'Invalid or expired token' });
//     }
// }

function restrictTo(roles) {
    return function(req, res, next) {
        if (!req.user) {
            return res.redirect("/login");
        }

        if (!roles.inclused(req.user.role)) {
            return res.end("Unauthorized");
        }
        return next();
    }
}

module.exports = {checkForAuthentication, restrictTo};
