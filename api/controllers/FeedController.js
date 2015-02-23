/**
 * FeedController
 *
 * @description :: Server-side logic for managing feeds
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `FeedController.dbPush()`
   */
  dbPush: function (req, res) {
  
    var tweets = Tweet.find().exec(console.log)
    //console.log(tweets)
    
    Feed.create(tweets).exec(console.log)
  
  },


  /**
   * `FeedController.dbPull()`
   */
  dbPull: function (req, res) {
    return res.json({
    
    });
  }
};

