/**
 * FeedInstagramController
 *
 * @description :: Server-side logic for managing Feedinstagrams
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var ig = require('instagram-node-lib');
var fs = require('fs') 
 
module.exports = {
	

  /**
   * `FeedInstagramController.dbPush()`
   */
  dbPush: function (req, res) {

    fs.unlink('igResponse.json')
    fs.unlink('igResponse2.json')
  
    ig.set('client_id', '3318adad30cc4c458aa8b8b5026cc657');
    ig.set('client_secret', 'aaab2c9d4e4d4ffe8a2e53bd2320226c');

    var igsSet = []
    var igs = []
    
    function getIG(lastID){
      ig.users.recent({ 
        user_id: 46311663,
        count: 33,
        max_id: lastID,
        complete: getIGResponse
      });
    }
    
    function getIGResponse(data, pagination){
      
      fs.appendFile('igResponse.json', JSON.stringify(data, null, 2))
      fs.appendFile('igResponse.json', 'NEWPAGEHERPADUR')
      
      igsSet = []
      
      for (i in data) {
        igsSet[i] = {}
        
        if (data[i].caption != null) igsSet[i].caption = data[i].caption.text
        igsSet[i].image = data[i].images.standard_resolution.url
        igsSet[i].comments = data[i].comments.count
        igsSet[i].created_time = data[i].created_time
        igsSet[i].likes = data[i].likes.count
        igsSet[i].link = data[i].link
      }
      fs.appendFile('igResponse2.json', JSON.stringify(igsSet, null, 2))
      fs.appendFile('igResponse2.json', 'NEWPAGEHERPADUR')
      Instagram.create(igsSet).exec(console.log)
      
      if (data.length == 33) getIG(pagination.next_max_id)
      
    }
    
    getIG()
  },


  /**
   * `FeedInstagramController.dbPull()`
   */
  dbPull: function (req, res) {

    sails.log.info("pulling instagram from db");
    return(Instagram.find().exec(console.log))
  
  }
};

