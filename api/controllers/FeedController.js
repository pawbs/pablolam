/**
 * FeedController
 *
 * @description :: Server-side logic for managing feeds
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs')
 
module.exports = {

  /**
   * `FeedController.dbPush()`
   */
  dbPush: function (req, res) {    
    
    fs.writeFile('feedResponse.json', '')
    
    function getFeedResponse(err, data) {
      Feed.create(data).exec(function(){})
      fs.appendFile('feedResponse.json', JSON.stringify(data, null, 4))
    }
    
    function getFeed() {
    
      Tweet.find().exec(getFeedResponse)
      Scrobble.find().exec(getFeedResponse)
      Instagram.find().exec(getFeedResponse)
    }
    
    getFeed()
    
  },
  
   /**
   * `FeedController.dbPull()`
   */
  dbPull: function (req, res) {

    sails.log.info("pulling tweets from db");
    //return(Feed.find().sort({date: 1}).exec(function(){}))
    

    Feed.find().sort({pabloDate : -1}).exec(findResponse)
    
    function findResponse(err,data){
      res.json(data)
      res.status(201)
    }
    
    //res.status(201);
    //res.json()
    //res.send("hnerp");
  }
  
};

