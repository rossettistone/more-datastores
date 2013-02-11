var mysql = require('mysql');
var querystring = require('querystring');
var dbConnection = mysql.createConnection({
    user:'root',
    password:'',
    database:'testchat'
});
var Sequelize = require("sequelize");
var sequelize = new Sequelize("testchat", "root", "");

var Message = sequelize.define('Message', {
  id: {type: Sequelize.INTEGER, autoIncrement: true},
  username: Sequelize.STRING,
  message: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  chatroom: Sequelize.STRING
});

dbConnection.connect();

var dbAccess = {
  messages : [],
  getRoomMessages: function(request, response, headers, room){
    var messages;
    // dbConnection.query('SELECT * FROM messages WHERE chatroom = "'+room+'"', function(err, results) { 
    //   if(err) throw err;
    //   response.writeHead(200, headers);
    //   messages = results;
    //   console.log("messageModel23");
    //   console.log(messages);
    //   response.end(JSON.stringify(messages));
    // });
    // Retrieve objects from the database:
    Message.findAll({ where: {chatroom: room} }).success(function(messages) {
      console.log("I herd you like logging: " + messages)
      // This function is called back with an array of matches.
      response.writeHead(200, headers);
      response.end(JSON.stringify(messages));
    });

    return messages
  },
  writeToFile: function(data,room){
    var mess = querystring.parse(data.toString());
    console.log(mess);
    // dbConnection.query('INSERT INTO messages (username, message, chatroom) VALUES("'+mess.username+'", "'+mess.message+'", "'+room+'");');
    Message.sync().success(function() {
      var newMessage = Message.build({username: mess.username,
                                message: mess.message,
                                createdAt: Date.now(),
                                chatroom: room
                               });
      newMessage.save().success(function() {
        console.log("YAY SUCCESS FEELS GOOD");
      });
    });
  }
}


exports.dbAccess = dbAccess;