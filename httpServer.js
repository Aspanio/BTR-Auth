const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
require('./config/passport.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://admin:qwe123@ds215563.mlab.com:15563/thoughts', {
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to db sucsessfuly. '))
  .catch(err => console.log('ERROR IN DB CONNECTION OCCURED: ', err));
//Routes
const indexRouter = require('./routes/index');
const facebookRouter = require('./routes/facebook');
const googleRouter = require('./routes/google');
const localRouter = require('./routes/local');

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/facebook', facebookRouter);
app.use('/google', googleRouter);
app.use('/local', localRouter);

app.listen(4000, () => console.log('Listening port 4000'));
