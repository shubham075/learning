const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.verifyUser = (req, res, next) => {
    if (!req.session.jwt) {
        return res.status(400).send({
            status: 400,
            message: "please login!",
            data: {}
        });
    }
    else {
        let jwtToken = req.session.jwt;
        const { id } = jwt.verify(jwtToken, process.env.JWT_KEY);
        req.loggedInUser = id;
        next();
    }
};

// exports.isLoggedIn = (req, res, next) => {
// 	let token
// 	const { authorization } = req.headers;
// 	if (authorization && authorization.startsWith('Bearer')) {
// 		try {
// 			token = authorization.split(' ')[1];
// 			const { admin_id } = jwt.verify(token, process.env.JWT_KEY);
// 			req.loggedInUser = admin_id;
// 			next();
// 		} catch (err) {
// 			res.status(400).send({
// 				status: 400,
// 				message: "No token provided!",
// 				data: err
// 			});
// 		}
// 	}
// 	else {
// 		res.status(400).send({
// 			status: 400,
// 			message: "No token provided!",
// 		});
// 	}
// }

