const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const CustomStrategy = require('passport-custom');
const User = require('../models/User');
//keys
const { google } = require('./keys');
const { fb } = require('./keys');

passport.serializeUser((user, done) => {
    done(null, user.email)
});

passport.deserializeUser((email, done) => {
    User.findOne({email: email})
        .then(user => done(null, user.email))
});

passport.use(new GoogleStrategy({
    callbackURL: '/google/redirect',
    clientID: google.clientID,
    clientSecret: google.clientSecret,
}, function(accessToken, refreshToken, profile, done) {
    User.findOne({email: profile.emails[0].value}).then(currentUser => {
        if(currentUser) {
            console.log('current user is :', currentUser);
            done(null, currentUser);
        } else {
            new User({ email: profile.emails[0].value, phone: 'none'}).save()
                .then((newUser => {
                    console.log('new user was created ', newUser);
                    done(null, newUser);
                }));
        }
    })
}));

passport.use(new FacebookStrategy({
    callbackURL: '/facebook/redirect',
    clientID: fb.clientID,
    clientSecret: fb.clientSecret,
    profileFields: ['emails'],
}, function(accessToken, refreshToken, profile, done) {
    User.findOne({email: profile.emails[0].value}).then(currentUser => {
        if(currentUser) {
            console.log('current user is :', currentUser);
            done(null, currentUser);
        } else {
            new User({ email: profile.emails[0].value, phone:'none' }).save()
                .then((newUser => {
                    console.log('new user was created ', newUser);
                    done(null, newUser);
                }));
        }
    })
}));

passport.use('phone-auth', new CustomStrategy(function(req, cb) {
    User.findOne({ phone: req.body.phone }).then(currentUser => {
        if(currentUser) {
            console.log('current user is :', currentUser);
            cb(null, currentUser)
        } else {
            new User({phone: req.body.phone, email: ' '}).save().then(newUser => {
                console.log('new user was created ', newUser);
                cb(null, newUser);
            })
            .catch(err => {
                if(err) console.log(err);
            })
        }
    })
    .catch(err => {
        if(err) console.log(err);
    })
}))
