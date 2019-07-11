const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
cosnt cookieParser = require("cookie-parser")
const path = require('path');
const mongoose = require('mongoose');
var app = express();

//express  session
app.use(cookieParser());
app.use(session({
  secret: 'secretkey....anystring',
  resave: false,
  saveUninitialized: true,
}));

app.get('/cookies', function(req, res){
   res.send("cookies are logged in the code editor");
  console.log(path);
  console.log(req.cookies);
  console.log(req.session);
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
