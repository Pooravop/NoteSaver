var jwt = require('jsonwebtoken');
require('dotenv').config();

const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and add id to req object body
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);  
        req.user = data.user;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchuser;