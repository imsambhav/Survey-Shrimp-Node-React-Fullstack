const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
      // this is relative path for dev & prod thats why http and https error
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Google data: ', profile.photos[0].value);
      console.log('Google data: ', profile.displayName);
      const existingUser = await User.findOne({
        googleId: profile.id,
        gName: profile.displayName,
        gImage: profile.photos[0].value
      });

      if (existingUser) {
        // We have a same User
        done(null, existingUser);
      } else {
        // We dont have this user, so create new
        const user = await new User({
          googleId: profile.id,
          gName: profile.displayName,
          gImage: profile.photos[0].value
        }).save();
        done(null, user);
      }
    }
  )
);
