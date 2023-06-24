var express = require('express');
var passport = require('passport');
var session = require('express-session');
var passportSteam = require('passport-steam');
var SteamStrategy = passportSteam.Strategy;
var app = express();

var port = 4000;

   // Initiate Strategy
passport.use(new SteamStrategy({
    returnURL: 'http://localhost:' + port + '/api/auth/steam/return',
    realm: 'http://localhost:' + port + '/',
    apiKey: 'BF24A5D4F82A65FC2AC391EDDB960C3D'
    }, function (identifier, profile, done) {
    process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
}));

app.use(session({
    secret: 'eyhowirngoi3ny4howrsaf',
    saveUninitialized: true,
    resave: false,
    cookie: {
     maxAge: 3600000,
     secure: true
    }
   }))
app.use(passport.initialize());
app.use(passport.session());

// Required to get data from user for sessions
passport.serializeUser((user, done) => {
    done(null, user); // saves user
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Routes
app.get('/', (req, res) => {
    res.send(req.user);
   });
app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
    res.redirect('/')
});
app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
    res.redirect('http://localhost:3000/')
    console.log(req.user)
    console.log(req.isAuthenticated())
});
app.get('/user', (req, res) => { // not authenticated, if use passport.authenticate, it is still not authenticated
    console.log("From /user")
    console.log(req.user)
    console.log(req.isAuthenticated())
    res.redirect('http://localhost:3000/')
    if(req.isAuthenticated()) {
        res.status(200).send({
          "success": true,
          "message": "success",
          "user": req.user
        })
      }
});

app.listen(port, () => console.log(`Express app running on port ${port}!`));