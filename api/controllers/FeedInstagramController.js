/**
 * FeedInstagramController
 *
 * @description :: Server-side logic for managing Feedinstagrams
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var ig = require('instagram-node-lib');
var fs = require('fs') 
var apikeys = require('../../config/apikeys.js');
 
module.exports = {
	

  /**
   * `FeedInstagramController.dbPush()`
   */
  dbPush: function (req, res) {

    fs.writeFile('igResponse.json', '')
    fs.writeFile('igResponse2.json', '')
  
    ig.set('client_id', apikeys.instagram_client_id);
    ig.set('client_secret', apikeys.instagram_client_secret);

    var igsSet = []
    var igs = []
    
    function getIG(lastID){
      ig.users.recent({ 
        user_id: 1596590435,
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
        
        if (data[i].caption != null) igsSet[i].text = data[i].caption.text
        igsSet[i].id_str = data[i].id
        igsSet[i].image = data[i].images.standard_resolution.url
        igsSet[i].comments = data[i].comments.count
        igsSet[i].pabloDate = String(data[i].created_time)
        igsSet[i].likes = data[i].likes.count
        igsSet[i].link = data[i].link
        igsSet[i].type = "instagram"
      }
      //fs.appendFile('igResponse2.json', JSON.stringify(igsSet, null, 2))
      //fs.appendFile('igResponse2.json', 'NEWPAGEHERPADUR')
      Instagram.create(igsSet).exec(function(){})
      
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

