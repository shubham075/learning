// const nodemailer = require('nodemailer');

// async function main() {
//     let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//             type: "OAuth2",
//             user: "prakashkumar730187@example.com",
//         },
//     });

//     transporter.set("oauth2_provision_cb", (user, renew, callback) => {
//         let accessToken = userTokens[user];
//         console.log(accessToken);
//         if (!accessToken) {
//             return callback(new Error("Unknown user"));
//         } else {
//             return callback(null, accessToken);
//         }
//     });

// }
// main().catch(console.error);
