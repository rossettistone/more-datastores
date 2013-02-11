var sitesList = [];
var MongoClient = require('mongodb').MongoClient;
var _ = require("underscore");
var database = require('../../dbModel.js').handler;

exports.downloadUrls = function(urls){
  console.log(urls);
  
  var requestRemotePage = function(url, callback) {
    var http = require('http-get');
    http.get(url, function (error, result) {
      if(error){ console.log(error) }
      console.log("requestRemotePage is returning:")
      console.log(result)
      callback(result);
    });
  }

  var sitename = "";
  MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
    var sites = db.collection("sites");

    _.each(urls, function(value, key, obj){
      
      sitename = value.name;
      requestRemotePage(sitename, function(result) {
        database.setHTML(result);
      });
    });
  });
};
