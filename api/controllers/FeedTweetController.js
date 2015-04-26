/**
 * FeedTweetController
 *
 * @description :: Server-side logic for managing feedtweets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var moment = require('moment');
var Twit = require('twit')
var fs = require('fs')
var apikeys = require('../../config/apikeys.js');
 
module.exports = {
	
  /**
   * `FeedTweetController.dbPush()`
   */
  dbPush: function (req, res) {
  
    fs.writeFile('twitResponse.json', '')
    fs.writeFile('twitResponse2.json', '')
    
    console.log("pushing tweets to db")
    sails.log.info("pushing tweets to db")
    
    var T = new Twit({
      consumer_key: apikeys.twitter_consumer_key,
      consumer_secret: apikeys.twitter_consumer_secret,
      access_token: apikeys.twitter_access_token,
      access_token_secret: apikeys.twitter_access_token_secret
    })
    
    function getTweetResponse(err, data, response){
    
      var tweets = [];
    
      //fs.appendFile('twitResponse.json', JSON.stringify(data, null, 4))
        
      for (i in data) {
        tweets[i] = {}
        tweets[i].text = data[i].text
        tweets[i].id_str = data[i].id_str
        tweets[i].retweet_count = data[i].retweet_count
        tweets[i].favorite_count = data[i].favorite_count
        tweets[i].entities = data[i].entities
        //tweets[i].created_at = data[i].created_at
        tweets[i].pabloDate = String(moment(data[i].created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').unix())
        tweets[i].type = "twitter"
      }
      
      Tweet.create(tweets).exec(function(){})
      //fs.appendFile('twitResponse2.json', JSON.stringify(tweets, null, 4))
      console.log('==========')
      console.log(tweets.length)
      console.log(tweets[tweets.length-1].id_str - 1)
      if (tweets.length > 0) getTweet(tweets[tweets.length-1].id_str - 1)
    }
    
    function getTweet(id_str){
      T.get('statuses/user_timeline', { 
        user_id: 'pawbs' , 
        max_id: id_str,
        count: 200 }, 
        getTweetResponse
    )}
    
    getTweet()
    
    console.log('finished dbpush')
    sails.log.info("finished dbpush")
    
  },


  /**
   * `FeedTweetController.dbPull()`
   */
  dbPull: function (req, res) {

    sails.log.info("pulling tweets from db");
    return(Tweet.find().exec(console.log))
    
  }
   
   
};

