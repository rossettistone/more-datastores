var worker = require("./lib/html-fetcher-helpers.js");
var fs = require("fs");
var urlSource = fs.readFileSync('.\/data\/sites.txt', 'utf-8')

worker.downloadUrls(urlSource.split('\n'));