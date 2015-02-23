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
  
    Tweet.find({}).exec(function findCB(err,tweets){
      console.log(tweets)
      Feed.create(tweets).exec(function emptyCB(err,tweets){
        console.log(err)
      })
      fs.writeFile('feed.json', JSON.stringify(tweets, null, 4))
    })
    
  }
};

