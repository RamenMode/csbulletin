var express = require('express');
var passport = require('passport');
var session = require('express-session');
var passportSteam = require('passport-steam');
var SteamStrategy = passportSteam.Strategy;
var app = express();

var port = 4000;


// Required to get data from user for sessions
passport.serializeUser((user, done) => {
    done(null, user); // saves user
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
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
    secret: 'y35htoewqtn428h53wr',
    saveUninitialized: true,
    resave: false,
    cookie: {
     maxAge: 3600000,
     secure: true
    }
   }))

app.use(passport.initialize());
app.use(passport.session());

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
});
app.get('/user', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
    res.status(200).send('sometext')
    //res.status(200).json({status: 200, req: req.user})
});

app.listen(port, () => console.log(`Express app running on port ${port}!`));