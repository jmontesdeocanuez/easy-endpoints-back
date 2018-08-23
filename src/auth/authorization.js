const jwt = require('jsonwebtoken')

const checkLogged = (req, res, next) => {
    jwt.verify(req.headers['authorization'], '1234', (err, token) => {
        err 
        ? res.status(403).json(makeResponseError(401, "You need to send a valid token (Authentication Error)"))
        : next()
    })
}

function makeResponseError(error) {
    return {
        status: "Forbidden",
        error: error
    }
}
 
 module.exports = checkLogged