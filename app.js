const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require("cookie-parser")
const path = require('path');
const mongoose = require('mongoose');
const app = express();

//express  session
const hour = 3600000
app.use(cookieParser());
app.set('trust proxy', 1) 
app.use(
  session({
    secret: 'secretkey....anystring',
    resave: false,
    saveUninitialized: true,
  }));

app.get('/cookies', function(req, res){
  req.session.count = req.session.count + 1 || 0;
  req.session.save();
  req.session.cookie.expires = new Date(Date.now() + hour);
  req.session.cookie.maxAge = hour;
  req.session.cookie.path = req.path;
   res.send({
    count: "reloaded page: " + req.session.count,
    sessionId : req.sessionID,
    sessionCookie: req.session.cookie
   });
});


//mondodb connection
mongoose.connect('mongodb+srv://newtest:newtest@cluster0-u9eoi.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true}, (err) => {
    if(!err) {console.log("mongodb connection successful")}
    else {console.log("mongodb connection failed" + err)}
});

var addItemSchema = new mongoose.Schema({
    Item: String
});

mongoose.model('Items', addItemSchema);

//EJS
app.set('view engine', 'ejs');

//body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//path
app.set('views', path.join(__dirname + '/views/'));

//routes
app.use('/', require('./routes'))

//port
app.listen(8000, () => {
    console.log("you are listening to port 8000")
});
