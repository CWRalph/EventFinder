const jwt = require('jsonwebtoken');

// middle ware function to verify anywhere that the user is verified
module.exports = function(req:any, res:any, next: () => void) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try {
        // this throws us back the ID that we had from user
        req.user = jwt.verify(token, process.env.JWT_TOKEN);
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}