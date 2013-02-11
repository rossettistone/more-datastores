var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "npm install mysql". */

var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "testchat"
});
/* You'll need to fill this out with your mysql username and password.
 * database: "chat" specifies that we're using the database called 
 * "chat", which we created by running schema.sql.*/

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

var http = require("http");
var handler = require("./request-handler.js");
var connect = require('connect');

//modules to deal with storind to flatfiles. TODO: replace with modules for DB access
var messageModel = require('./messageModel');
var dbAccess = messageModel.dbAccess;


//reload chat messages stored in database from previous sessions
// dbAccess.loadFromDB();

var requestListener = function (request, response) {
  var headers = ""; //???f
  handler.handleRequest(request,response, headers);
};

var port = 8080;
var ip = '127.0.0.1';

var server = connect.createServer();
server.use(connect.static('public'));
server.use(function(req, res){
  requestListener(req, res);
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port);


dbConnection.end();
