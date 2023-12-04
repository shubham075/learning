const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = async (req, res, next) => {
    if (!req.session.jwt) {
        return res.status(400)
            .render('login', { alert: 'Please login first' })
    }
    else {
        let jwt_token = req.session.jwt;
        const { user_id } = jwt.verify(jwt_token, process.env.JWT_KEY);
        req.logged_in_userID = user_id;
        next();
    }
}