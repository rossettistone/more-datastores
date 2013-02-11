/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request');

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function() {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "",
      database: "testchat"
    });
    /* TODO - You'll need to fill this out with your mysql username
     * and password. */
    dbConnection.connect();

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    var tablename = "Messages"; // TODO fill this out
    // dbConnection.query('DELETE FROM ' + tablename, function(){
    //   console.log("deletion complete");
    // });
  });

  afterEach(function() {
    dbConnection.end();
  });
             
  it("Should insert posted messages to the DB", function(done) {
    // Post a message to the node chat server:
    setTimeout(function(){
    request({method: "POST",
             uri: "http://127.0.0.1:8080/1/classes/testroom",
             form: {id: 1,
                    username: "Valjean",
                    message: "In mercy's name, three days is all I need.",
                    createdAt: "",
                    chatroom: "testroom"}
            },
            function(error, response, body) {
              /* Now if we look in the database, we should find the
               * posted message there. */
               console.log("posted")
              
              var queryString = "SELECT * FROM Messages";
              var queryArgs = [];
              /* TODO - The exact query string and query args to use
               * here depend on the schema you design, so I'll leave
               * them up to you. */
              dbConnection.query( queryString, queryArgs,
                function(err, results, fields) {
                  // Should have one result:
                  // console.log(err);
                  // console.log(fields);
                  console.log(results);
                  expect(results.length).toEqual(1);
                  expect(results[0].username).toEqual("Valjean");
                  expect(results[0].message).toEqual("In mercy's name, three days is all I need.");
                  /* TODO You will need to change these tests if the
                   * column names in your schema are different from
                   * mine! */

                  done();
                });
            })
    }, 1000);
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    var queryString = 'INSERT INTO Messages (username, message) VALUES("Javert", "Men like you can never change!")';

    dbConnection.query( queryString,
      function(err, results, fields) {
        /* Now query the Node chat server and see if it returns
         * the message we just inserted: */
        request("http://127.0.0.1:8080/1/classes/testroom",
          function(error, response, body) {
            console.log(body)
            var messageLog = JSON.parse(body);
            console.log("LiveSpec83");
            // console.log(error, response, body);
            expect(messageLog[0].username).toEqual("Javert");
            expect(messageLog[0].message).toEqual("Men like you can never change!");
            done();
          });
      });
  });  
});
