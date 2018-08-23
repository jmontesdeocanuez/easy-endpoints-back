const token = require('./authentication-token.js');

const checkAPIToken = (req, res, next) => {
    const apitoken = req.headers['x-api-token']
    if (apitoken){
        if (!token.includes(apitoken)) {
            return res.status(401).json(makeResponseError(401, "You dont have a valid token (Authentication Error)"));
        }
        next()
    } else {
        return res.status(401).json(makeResponseError(401, "You need to send valid token (Authentication Error)"));
    }
 }

function makeResponseError(nerror, error) {
    return {
        status: "Unauthorized",
        error: error
    }
}
 
 module.exports = checkAPIToken