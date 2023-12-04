// const CryptoJS = require("crypto-js");
// const config = require("../../db/config/config_details")
// encode = async (req) => {
//     // means the request is from swagger 
//     //encode the req and set the encoded data in data

//     if ((Object.keys(req.body).length != 0)) {
//         if (req.headers.origin === config.swagger_origin) {
//             req.app.set("swagger", true);
//             req.body.data = { newData: CryptoJS.AES.encrypt(JSON.stringify(req.body), config.encrypt_key).toString()  };
//             return req;
//         } else {
//             //means the req is not from the swagger
//             req.app.set("swagger", false);
//             return req
//         }
//     } else {
//         //means the req is not a post request
//         req.app.set("swagger", false);
//         return req;
//     }
// };

// decode = async (req) => {
//     if ((Object.keys(req.body).length != 0)) {
//         req.body = req.body.data.newData;
//         var bytes = CryptoJS.AES.decrypt(req.body, config.encrypt_key);
//         req.body = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//         return req;
//     } else {
//         return req;
//     }
// };

// const crypto = {
//     encode: encode,
//     decode: decode
// };
// module.exports = crypto;