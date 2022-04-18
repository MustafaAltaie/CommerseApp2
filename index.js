const express = require('express');
const exphbs = require('express-handlebars');
const bodyP = require('body-parser');
const upload = require('express-fileupload');
const controllers = require('./controllers/controllers');
const fs = require('fs');
const path = require('path');

var app = express();
var port = process.env.PORT || 3000;
app.listen(port);


app.use(bodyP.urlencoded({
    extended: true
}));


app.engine('html', exphbs.engine({
    extname: "html",
    defaultLayout: "mainLayout"
}));

app.set('view engine', "html")

app.use(upload());

console.log('App is working');

app.use(express.static(path.join(__dirname, '')));

app.use('', controllers);

fs.readdirSync('otherRouters').forEach(function(file){
    app.use('', require('./otherRouters/' + file));
});