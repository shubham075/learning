
// const { SUCCESS }      = require('./response_message');
// const Error            = require('../utils/response_message').ERROR
// const logging          = require('./logging');
// const _                = require('underscore');
// const config           = require('../../db/config/config_details');

// const CryptoJS           = require("crypto-js");


// exports.response = (res, status, message, result) => {
// 	let response;
// 	response = {
// 		status,
// 		message,
// 		data: result,
// 	}
// 	return res.json({ 'res': response });
// };


// exports.sendError = function (err, res) {
// 	const errorMessage = err.customMessage || err.message || Error.DEFAULT.customMessage;
// 	if (typeof err == 'object' && err.hasOwnProperty('rescode') && err.hasOwnProperty('customMessage')) {
// 		return res.status(err.statusCode).send({ statusCode: err.statusCode, message: errorMessage, type: err.type || Error.DEFAULT.type });
// 	}
// 	let statusCode = err.hasOwnProperty('statusCode') ? err.statusCode : 400;
// 	let responseObj = { statusCode: statusCode, message: errorMessage, type: err.type || Error.DEFAULT.type };
// 	logging.logResponse(responseObj);
// 	return res.status(statusCode).send(responseObj);
// };

// exports.sendSuccess = function (successMsg, data, res, receivedResponseObj) {
// 	let statusCode = successMsg.statusCode || 200;
// 	let message = successMsg.customMessage || SUCCESS.DEFAULT.customMessage;
// 	let responseObj = receivedResponseObj ? receivedResponseObj : { statusCode: statusCode, message: message, data: data || {} };

// 	if (origin && origin != config.swagger_origin) {
// 		//logging.logResponse(responseObj);
// 		responseObj = CryptoJS.AES.encrypt(JSON.stringify(responseObj), config.encrypt_key).toString();
// 		return res.status(statusCode).send(responseObj);
// 	} else {
// 		//logging.logResponse(responseObj);
// 		responseObj = CryptoJS.AES.encrypt(JSON.stringify(responseObj), config.encrypt_key).toString();
// 		return res.status(statusCode).send(responseObj);
// 	}
// };

  