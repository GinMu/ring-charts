var express = require('express');
var fs = require('fs');
var app = module.exports = express();
app.all('/*/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});
app.get('/devices',function(req,res){
  var data = fs.readFileSync('ring.log','utf8');
  res.send(data);
});
app.listen(8080);
