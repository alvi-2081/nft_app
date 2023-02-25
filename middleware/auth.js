const jwt = require("jsonwebtoken");
const config = process.env;
const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ response: 403, message: "A token is required for authentication", status: false });
    }
    try {
        let decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({ response: 401, message: "Invalid Token", status: false });
    }
    return next();
}

module.exports = verifyToken;