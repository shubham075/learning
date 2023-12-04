
const constant = require('../utils/constant');
const emailTemplates = require('../libs/emailTemplates');
const Handlebars = require('handlebars');
const config = require('../../db/config/config_details');
const nodemailer = require('nodemailer');



exports.sendEmail = async (emailType, emailVariables, emailSubject) => {

    try {
        //handle all invalid email IDs in array
        emailVariables.email_ids = await removeInvalidIds(emailVariables.email_ids);

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: false,
            auth: {
                user: config.email_id,
                pass: config.mail_password
            }
        });

        let mailOptions = {
            from: config.email_id,
            to: emailVariables.email_ids,
            subject: emailSubject,
            html: null
        }

        //use switch case statement for mail type validations
        switch (emailType) {
            case constant.emailType.EMAIL_VERIFICATION_OTP:
                mailOptions.html = await renderMessageFromTemplateAndVariable(emailTemplates.verificationToken, emailVariables);
                break;

            default:
                console.error(`No case matched while sending mail with : ${emailType}`)
                return;
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('inside transporter console.error with throw error:::')
                console.error(error);
                return error;
            }
            else {
                console.log(`Email sent: ${info.response}`);
                return info;
            }
        });

    } catch (error) {
        console.log('inside email catch satement:::')
        console.error(error);
        throw error;
    }
};


async function renderMessageFromTemplateAndVariable(templateData, variablesData) {
    return Handlebars.compile(templateData)(variablesData);
}



async function removeInvalidIds(allIds) {
    //done job to handle the case where array is passed after stringyfying//
    allIds = allIds.toString();
    allIds = allIds.split(',');

    allIds = allIds.filter((id) => {
        !/@facebook.com/i.test(id.trim())
    });

    return allIds;
};