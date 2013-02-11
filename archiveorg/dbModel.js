var database = require('./dbConnectionModel.js').database;

var sites = database.collection('sites');


exports.handler = {

  getHTML: function(data, callback){
    //goes into the collection and finds the html file corresponding to the url provided as the data argument
  },

  getURLs: function(data, callback){
    //nothing to do with the user.
    //this function grabs, on a schedule, the html for each url in the database.
  },

  setHTML: function(data, callback){
    //nothing to do with the user.
    //adds HTML to a document that already has a URL in the 'sites' collection
    sites.update({name:sitename}, {$set:{data:data}}, function(err,result){
        if(err){console.log(err)};
        console.log(result);
        console.log("Finished get.")
      });
  },

  setURL: function(data, callback){
    //put the data into the collection
    sites.insert({name: data.toString().slice(4)}, function(err,result){});
    //call the worker to get the html at this time
  }

}


