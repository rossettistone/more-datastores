var MongoClient = require('mongodb').MongoClient;

exports.database;

var dbConnection = function(){
  MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
    database = db;
  };
};

dbConnection();