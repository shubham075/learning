const nodemailer = require('nodemailer');
require('dotenv').config();
let emailID = 'prakashkumar730187@gmail.com';
async function main(mailId) {
    // let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        service:'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure:false,
        auth: {
            user:'prakashshubham075@gmail.com',
            pass: process.env.PASS
        }
    });

    let info = await transporter.sendMail({
        from: '<prakashshubham075@gmail.com>',
        to: mailId,
        subject: 'sending dummy email to test nodemailer',
        text: 'final testing of nodemailer!!'
    });

    console.log("message sent!!..... ", info.messageId);

    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main(emailID).catch(console.error);