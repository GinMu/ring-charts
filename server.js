var express = require('express');
var fs = require('fs');
var app = module.exports = express();
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});
app.get('/',function(req,res){
  var filename = req.query.filename;
  var data = fs.readFileSync(filename,'utf8');
  res.send(data);
});
app.listen(8080);
