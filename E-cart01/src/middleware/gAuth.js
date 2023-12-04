const googleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../../db/models/userModel');

require('dotenv').config();

module.exports = async (passport) => {
    passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/google/callback"
    }, async(accessToken, refreshToken, profile, done)=>{
        console.log('profile data is >>>>>>>>>>>>',profile);
        const [user, created] = await userModel.user.findOrCreate({
            where:{
                email: profile.emails[0].value
            },
            defaults:{
                name: profile.displayName,
                email: profile.emails[0].value
            }
        });
        console.log('user is >>>>>>>>>>>>>',user);
        return done(null, user);
    }
    ));

    passport.serializeUser(function (user, done) {
        console.log('user is :::::::::::::::::::::::::::::::::::::::::::::::::::::::::', user);
        done(null, user.email);
    });

    // passport.deserializeUser(function (id, done) {
    //     admin_sql_conn.adminUser.findById(id, function (err, user) {
    //         done(err, user);
    //     });
    // });
}
