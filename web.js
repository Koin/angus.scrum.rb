var gzippo = require('gzippo');
var express = require('express');

var app = express.createServer(express.logger());
app.use(gzippo.staticGzip(__dirname + '/app'));
app.listen(process.env.PORT || 5000);

