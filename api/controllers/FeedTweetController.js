/**
 * FeedTweetController
 *
 * @description :: Server-side logic for managing feedtweets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Twit = require('twit')
var fs = require('fs')
 
module.exports = {
	


  /**
   * `FeedTweetController.dbPush()`
   */
  dbPush: function (req, res) {
    
    console.log("pushing tweets to db")
    sails.log.info("pushing tweets to db")
    
    var tweets = [];
    
    var T = new Twit({
      consumer_key: 'QveUKApaKWnWLgnHGlIWwRGTS', 
      consumer_secret: '2aOH229565R6YGJxIueG4DE0X7vh69YYNoJfFHomFMvZGm3vPp', 
      access_token: '75707133-6RUQM3fA2By7HqQSJj8rIqInF7HQ6QyBVil4Flj7A', 
      access_token_secret: '7aOUMqWhGPDdIP0GZkH4dXBWvUAs5HzXgf2JIFv4cAnty'
    })
    
    T.get('statuses/user_timeline', { user_id: 'pawbs' , count: 100 }, function(err, data, response) {
      //console.log(data)
      fs.writeFile('twitResponse.json', JSON.stringify(data, null, 4))
      
      //tweets=[data.length];
      
      for (i in data) {
        tweets[i] = {}
        tweets[i].text = data[i].text
        tweets[i].id_str = data[i].id_str
        tweets[i].retweet_count = data[i].retweet_count
        tweets[i].favorite_count = data[i].favorite_count
        tweets[i].entities = data[i].entities
        tweets[i].created_at = data[i].created_at
      }
      
      //Tweet.create({herp: "asdf"}).exec(console.log)
      Tweet.create(tweets).exec(console.log)
      
      //Tweet.create(tweets)
      fs.writeFile('twitResponse2.json', JSON.stringify(tweets, null, 4))
      
    })
    
    console.log('finished dbpush')
    sails.log.info("finished dbpush")
    
  },


  /**
   * `FeedTweetController.dbPull()`
   */
  dbPull: function (req, res) {

    sails.log.info("pulling tweets from db");
  }
};

