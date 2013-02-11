var MongoClient = require('mongodb').MongoClient;
var url = require('url');
var worker = require("../workers/lib/html-fetcher-helpers.js");



var retMessage = function(res, responseCode, returnMessage) {
  res.writeHead(responseCode);
  res.end(returnMessage);
}

exports.handleRequest = function (req, res, outputOverride) {
  var parsedURL = url.parse(req.url, true);
  // console.log(parsedURL.pathname);
  var startPage = '<html>                                                                                             \
                   <head>                                                                                             \
                  <link rel="stylesheet" type="text/css" href="styles.css" />                                         \
                  <script src="http://code.jquery.com/jquery-1.8.3.min.js" /></script>                                \
                  </head>                                                                                             \
                  <body>                                                                                              \
                  <form action="http://127.0.0.1:8080/" method="POST">                                                \
                    <input type="input" name="url" id="urlInput" placeholder="Pick a website.  Any website."></input> \
                    <input type="submit" value="Submit"></input>                                                      \
                  </form>                                                                                             \
                  </body>                                                                                             \
                  </html>';

  var postRequestHandler = function(){



  };

  var getRequestHandler = function(){



  };



  //below here doesn't exist.

  var requestedSite = function (){

    //MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {

      var sites = db.collection('sites');
      var nameResults = sites.find({name: parsedURL.pathname.slice(1)});
      var dataResults = sites.findOne({name: parsedURL.pathname.slice(1)},{data: 1}, function(err,item){});
      if(!nameResults && !dataResults){
        console.log("Not archived.")
        return "That site has not been archived yet.";

      } else if (!dataResults) {
        console.log("Archived, but worker hasn't done work.")
        return "Give us a minute to load your file.";
      } else {
        console.log("Returning site from DB.")
        console.log(dataResults)
        return dataResults;
      }

    });

  }

  // var whattoReturntoSender = parsedURL.pathname !== "/" ? requestedSite(res) : startPage;
  
  if(req.method === "GET"){
    retMessage(res, 200, parsedURL.pathname !== "/" ? requestedSite() : startPage);
  } else {
    req.on('data', function(data) {
      MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
        var sites = db.collection("sites");
        sites.insert({name: data.toString().slice(4)}, function(err,result){ // adds a new URL to the database
          sites.find({},{name:"A"}).toArray(function(err,items){ // get all URLs in DB
            worker.downloadUrls(items); // download all data for those URLs?
          });
        });
      });
    });
  }

//above here doesn't exist.


};
