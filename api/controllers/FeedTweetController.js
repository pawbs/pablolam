/**
 * FeedTweetController
 *
 * @description :: Server-side logic for managing feedtweets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `FeedTweetController.dbPush()`
   */
  dbPush: function (req, res) {

    sails.log.info("pushing tweets to db");
    sails.log.info();
  },


  /**
   * `FeedTweetController.dbPull()`
   */
  dbPull: function (req, res) {

    sails.log.info("pulling tweets from db");
  }
};

