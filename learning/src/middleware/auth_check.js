const jwt = require('jsonwebtoken');
const config = require('../../db/config/config_details');
const responseMessage = require('../utils/response_message')

const authFunction = {
    authCheck: function (accessToken) {
        return new Promise((resolve, reject) => {
            try {
                let decode = jwt.verify(accessToken, config.jwt_key);
                if (decode) {
                    return resolve({ data: decode })
                }
                else {
                    throw new Error(responseMessage.ERROR.INVALID_ACCESS_TOKEN)
                }
            }
            catch (error) {
                return reject(error);
            }
        })
    },

    verify_admin: (req, res, next) => {
        let token;
        const { authorization } = req.headers;
        if (authorization && authorization.startsWith('Bearer')) {
            try {
                token = authorization.split(' ')[1];
                if (!token) {
                    return res.status(401).json({ message: 'Unauthorized - No token provided' })
                }
                jwt.verify(token, config.jwt_key, (err, decoded) => {
                    if (err) {
                        return res.status(401).json({ message: 'Unauthorized - Invalid token.' });
                    }
                    if (decoded.role !== 'admin') {
                        return res.status(403).json({ message: 'Forbidden - Insufficient permissions.' })
                    }
                    //loggedIn admin data
                    req.user = decoded;
                    next();
                })
            } catch (err) {
                res.status(401).json({
                    message: "No token provided!",
                    data: err
                });
            }
        }
        else {
            res.status(401).json({
                message: "No token provided!",
            });
        }
    },
};




module.exports = { authFunction };

