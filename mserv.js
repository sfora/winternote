
var express = require('express');
var app = express();
var pliksys = require('fs');
var connect = require('connect')


 // app.use(connect.json());

//app.use(express.urlencoded());
app.use(connect.json());
// simple logger
app.use(function (req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

// respond
app.get('/test.html', function(req, res, next){
  res.sendfile("./test.html");
});

app.get('/', function(req, res) {
    res.sendfile('./test.html');
});

app.get('/moj.json', function(req, res) {
    res.sendfile('./moj.json');
});

app.get('/moj.json', function(req, res) {
    res.sendfile('./moj.json');
});
app.post('/zapisz', function(req,res){
    console.log(req.body);
    var dupa = req.body;
    console.log(dupa);
pliksys.writeFile('moj.json', JSON.stringify(dupa), function (err) {});
//  if (err) throw err;
//  console.log('It\'s saved!');
});
app.listen(8080);