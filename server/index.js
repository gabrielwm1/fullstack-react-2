const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
mongoose.connect(keys.mongoURI);
require('./models/User');
require('./services/passport');

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 100,
    keys: [keys.cookieKey],
  })
);
//make use of cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
