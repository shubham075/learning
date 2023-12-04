// const Joi      = require('joi');
// const utility  = require('../utils/utility');
// const logging  = require('../utils/logging');


// exports.adminDashboardData = function (req, res, next) {
// 	logging.startSection('adminDashboardData');
// 	logging.logRequest(req);
// 	const schema = Joi.object().keys({
		
// 	});

// 	let validFields = validateFields(req.query, res, schema);
// 	if (validFields) {
// 		if (validateAccessTokenFields(req, res,'GET')) {
// 			next()
// 		};
// 	}
// }


// const validateFields = function (req, res, schema) {
// 	const validation = schema.validate(req);

// 	if (validation.error) {
// 		let errorName = validation.error.name;
// 		let errorReason =
// 			validation.error.details !== undefined
// 				? validation.error.details[0].message
// 				: 'Parameter missing or parameter type is wrong';
// 		utility.sendError(new Error(errorName + ' ' + errorReason), res);
// 		return false;
// 	}
// 	return true;
// };


// const validateAccessTokenFields = function (req, res, method) {
// 	logging.consolelog('REQUEST HEADERS : ' + req.headers);

// 	if (req.headers.authorization == undefined || req.headers.authorization == null || req.headers.authorization == '') {
// 		let errorReason = 'authorization is required';
// 		utility.sendError(new Error(errorReason), res);
// 		return false;
// 	}

// 	var split = req.headers.authorization.split(" ");
// 	if (!(split.length == 2 && split[0] === "Bearer")) {
// 		let errorReason = 'authorization is required';
// 		utility.sendError(new Error(errorReason), res);
// 		return false;
// 	}

// 	if (method == 'GET') {
// 		req.query.access_token = split[1];
// 	}
// 	else {
// 		req.body.access_token = split[1];
// 	}

// 	return true;
// }


