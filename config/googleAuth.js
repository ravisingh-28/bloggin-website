// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
// const User = require("../routes/registerModels");

// //passport google strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID:
//         "195118986970-6sr88jhohv2hm9c6b484gpci44ocook7.apps.googleusercontent.com",
//       clientSecret: "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",
//       callbackURL: "https://blog-site-by-vihan.herokuapp.com/google/callback",
//       passReqToCallback: true,
//     },
//     function (request, accessToken, refreshToken, profile, done) {
//       User.findOrCreate(
//         {
//           name: profile.displayName,
//           email: profile.email,
//           provider: "GOOGLE",
//         },
//         function (err, user) {
//           return done(err, user);
//         }
//       );
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });


const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../routes/registerModels");

//passport google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // You should also store the callback URL in the environment variable
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

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
