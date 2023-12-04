const GoogleStrategy = require('passport-google-oauth20').Strategy;
//import adminUser model (dao.js file) to create/update userData;

const admin_sql_conn = require('../../db/models/admin');

require('dotenv').config();

module.exports = async function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/google/callback"
    }, async (accessToken, refreshToken, profile, done) => {
        // console.log(profile);
        const data = await admin_sql_conn.adminUser.findOne({
            where: { email: profile.emails[0].value }
        });
        if (data) {
            console.log("updated data is>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ",data);
            return done(null, data);
        }
        else {
            const newData = await admin_sql_conn.adminUser.create({
                userID: profile.name.givenName,
                email: profile.emails[0].value
            });
            console.log('new data is>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', newData);
            return done(null, newData);
        }
    }
    ));//end passport.use();
    passport.serializeUser(function (user, done) {
        console.log('user is :::::::::::::::::::::::::::::::::::::::::::::::::::::::::', user);
        done(null, user.email);
    });

    passport.deserializeUser(function (id, done) {
        admin_sql_conn.adminUser.findById(id, function (err, user) {
            done(err, user);
        });
    });

}
