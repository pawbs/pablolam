/**
 * FeedScrobbleController
 *
 * @description :: Server-side logic for managing Feedscrobbles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var LastFmNode = require('lastfm').LastFmNode
var fs = require('fs') 
var apikeys = require('../../config/apikeys.js');
 
module.exports = {

  /**
   * `FeedScrobbleController.dbPush()`
   */
  dbPush: function (req, res) {

    fs.writeFile('scrobbleResponse.json', '')
    fs.writeFile('scrobbleResponse2.json', '')
    
    var scrobble = []
  
    var lastfm = new LastFmNode({
      api_key: apikeys.lastfm_api_key,    // sign-up for a key at http://www.last.fm/api
      secret: apikeys.lastfm_secret
    })
    
    function getScrobbleResponse(data){

      for (i in data.lovedtracks.track) {
        scrobble[i] = {}
        if (data.lovedtracks.track[i].image != null) scrobble[i].image = data.lovedtracks.track[i].image[3]['#text']
        scrobble[i].text = data.lovedtracks.track[i].name
        scrobble[i].url = data.lovedtracks.track[i].url
        scrobble[i].pabloDate = String(data.lovedtracks.track[i].date.uts)
        scrobble[i].artist = data.lovedtracks.track[i].artist.name
        scrobble[i].type = "lastfm"
      }
      
      //console.log(data.lovedtracks.track[0].name)
      //console.log(scrobble)
      
      //fs.appendFile('scrobbleResponse.json', JSON.stringify(data.lovedtracks.track, null, 2))
      //fs.appendFile('scrobbleResponse2.json', JSON.stringify(scrobble, null, 2))
      Scrobble.create(scrobble).exec(function(){})
      
      //Scrobble.create().exec(console.log)
      
      var metadata = data.lovedtracks['@attr']
      console.log(metadata)
      if (metadata.totalPages > metadata.page) getScrobble(metadata.page + 1, metadata.total - metadata.page*50)
    }
    
    function getScrobble(page, count){
      lastfm.request('user.getLovedTracks', {
        user: 'pb_overflow',
        page: page,
        limit: 9999999,
        handlers: {
            success: getScrobbleResponse,
            error: function(error) {
                console.log("Error: " + error.message);
            }
        }
      })
    }
    
    getScrobble(1, 50)
    
  
  },


  /**
   * `FeedScrobbleController.dbPull()`
   */
  dbPull: function (req, res) {

  
  
  }
};

