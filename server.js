const express = require('express');
const fs = require('fs');
const readline = require('readline');
var app = module.exports = express();
app.all('/*/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});
app.get('/chart', function(req, res) {
    var filename = req.query.filename;
    var path = '/incoming/devlope/ringcharts/' + filename;
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            res.send(404);
        } else {
            res.send(200, data);
        }
    });
});
app.get('/search', function(req, res) {
    var array = [];
    var uuid = req.query.uuid;
    var time = req.query.time;
    var path = "/home/afd/sync/data/" + time + "/result.log";
    const rl = readline.createInterface({
        input: fs.createReadStream(path),
        output: process.stdout,
        terminal: false
    });

    rl
        .on('line', function(line) {
            var data = JSON.parse(line);
            if (data.uuid == uuid) {
                array.push(data);
            }
        })
        .on('close', function() {
            res.send(array);
        });
});
app.get('/region', function(req, res) {
    var time = req.query.time;
    var path = "/incoming/devlope/regionMaps/" + time + ".log";
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            res.send(404);
        } else {
            res.send(200, data);
        }
    });
});
app.listen(8000);
