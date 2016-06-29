const readline = require('readline');
const fs = require('fs');
const express = require('express');
var app = module.exports = express();

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});
app.get('/', function(req, res) {
    var array = [];
    var uuid = req.query.uuid;
    var time = req.query.time;
    var path = "/home/afd/sync/data/" + time + "/result.log";
    const rl = readline.createInterface({
        input: fs.createReadStream(path),
        output: process.stdout,
        terminal: false
    });

    rl.on('line', function(line) {
        var data = JSON.parse(line);
        if (data.uuid == uuid) {
            array.push(data);
        }
    });
    rl.on('close', function() {
        res.send(array);
    })

});
app.listen(8000);