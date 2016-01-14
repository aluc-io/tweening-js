var fs = require('fs');
var browserify = require('browserify');

var helloBackbone = browserify('example.js');

helloBackbone.bundle().pipe( fs.createWriteStream('bundle.js'));
