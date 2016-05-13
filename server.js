var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require ('passport-facebook').Strategy;
var keys = require('./keys')


var app = express();
app.use(session({secret: 'hello'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+'/public'));
passport.use(new FacebookStrategy({
    clientID: keys.facebookKey,
    clientSecret: keys.facebookSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(token, refreshToken, userProfile, done) {
    done(null, userProfile);
  }
));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/me',
  failureRedirect: '/login'
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/me', function(req, res){
  res.send(req.user);
});

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/27017');


app.listen(3000, function () {
  console.log('listening on port 3000 Huzah!');
});
