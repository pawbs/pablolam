var moment = require('moment');
var Twit = require('twit')
var LastFmNode = require('lastfm').LastFmNode
var ig = require('instagram-node-lib');
var fs = require('fs')
var apikeys = require('../config/apikeys.js');

module.exports = {
    run : function(){
    
    //define API setup here
    var T = new Twit({
      consumer_key: apikeys.twitter_consumer_key,
      consumer_secret: apikeys.twitter_consumer_secret,
      access_token: apikeys.twitter_access_token,
      access_token_secret: apikeys.twitter_access_token_secret
    })
    
    var lastfm = new LastFmNode({
      api_key: apikeys.lastfm_api_key,    // sign-up for a key at http://www.last.fm/api
      secret: apikeys.lastfm_secret
    })
    
    ig.set('client_id', apikeys.instagram_client_id);
    ig.set('client_secret', apikeys.instagram_client_secret);
    
    var overrideFiles = []
    
    
    //define responses
    function getTweetResponse(err, data, response){
      var tweets = [];
    
      for (i in data) {
        tweets[i] = {}
        tweets[i].text = data[i].text
        tweets[i].id_str = data[i].id_str
        tweets[i].retweet_count = data[i].retweet_count
        tweets[i].favorite_count = data[i].favorite_count
        tweets[i].entities = data[i].entities
        tweets[i].pabloDate = String(moment(data[i].created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').unix())
        tweets[i].type = "twitter"
        
        Feed.update(
          {id_str : tweets[i].id_str},
          tweets[i]
        ).exec(function(){})

        Feed.findOrCreate(
          {id_str : tweets[i].id_str},
          tweets[i]
        ).exec(function(){})
      }
    }
    
    function getScrobbleResponse(data){
      var scrobble = []
    
      for (i in data.lovedtracks.track) {
        scrobble[i] = {}
        if (data.lovedtracks.track[i].image != null) scrobble[i].image = data.lovedtracks.track[i].image[3]['#text']
        scrobble[i].text = data.lovedtracks.track[i].name
        scrobble[i].url = data.lovedtracks.track[i].url
        scrobble[i].pabloDate = String(data.lovedtracks.track[i].date.uts)
        scrobble[i].artist = data.lovedtracks.track[i].artist.name
        scrobble[i].type = "lastfm"
        
        Feed.findOrCreate(
          {artist : scrobble[i].artist, text : scrobble[i].text},
          scrobble[i]
        ).exec(function(){})
        
      }
    }
    
    function getIGResponse(data, pagination){
      
      igsSet = []
      
      for (i in data) {
        igsSet[i] = {}
        
        if (data[i].caption != null) igsSet[i].text = data[i].caption.text
        igsSet[i].id_str = data[i].id
        
        igsSet[i].image = data[i].images.standard_resolution.url
        for (var j = 0; j < overrideFiles.length; j++){
          if (data[i].id == overrideFiles[j].substr(0, overrideFiles[j].length - 4)) { 
            igsSet[i].image = "images/instaOverride/" + overrideFiles[j]
          }
        }
       
        igsSet[i].comments = data[i].comments.count
        igsSet[i].pabloDate = String(data[i].created_time)
        igsSet[i].likes = data[i].likes.count
        igsSet[i].link = data[i].link
        igsSet[i].type = "instagram"
        
        Feed.findOrCreate(
          {id_str: igsSet[i].id_str},
          igsSet[i]
        ).exec(function(){})
        
        Feed.update(
          {id_str: igsSet[i].id_str},
          igsSet[i]
        ).exec(function(){})

      }
    }
    
    //define api call
    function getTweet(id_str){
      T.get('statuses/user_timeline', { 
        user_id: 'pawbs' , 
        max_id: id_str,
        count: 200 }, 
        getTweetResponse
    )}
    
    function getScrobble(page, count){
      lastfm.request('user.getLovedTracks', {
        user: 'pb_overflow',
        page: page,
        limit: 1000,
        handlers: {
            success: getScrobbleResponse,
            error: function(error) {
                console.log("Error: " + error.message);
            }
        }
      })
    }
    
    function getIG(lastID){
      ig.users.recent({ 
        user_id: 1596590435,
        count: 33,
        max_id: lastID,
        complete: getIGResponse
      });
    }
    
    //main
    console.log('updating data');
    getTweet()
    getScrobble()
    
    overrideFiles = []
    overrideFiles = fs.readdirSync("assets/images/instaOverride")
    getIG()
    
  }
};
