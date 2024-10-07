const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../routes/registerModels");

//passport google strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
            User.findOrCreate(
                {
                    name: profile.displayName,
                    email: profile.email,
                    provider: "GOOGLE",
                },
                function (err, user) {
                    return done(err, user);
                }
            );
        }
    )
);
