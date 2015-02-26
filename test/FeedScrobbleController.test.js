var assert = require('assert');
var FeedScrobbleController = require('../api/controllers/FeedScrobbleController.js');
var Sails = require('sails');

describe('FeedScrobbleController', function() {

  // create a variable to hold the instantiated sails server
  var app;

  // Global before hook
  before(function(done) {

    // Lift Sails and start the server
    Sails.lift({

      log: {
        level: 'error'
      },

    }, function(err, sails) {
      app = sails;
      done(err, sails);
    });
  });

  // Global after hook
  after(function(done) {
    app.lower(done);
  });
  
  describe('#push()', function() {
    it('should push scrobble to db', function (done) {
      this.timeout(10000)
    
      console.log(app)
      FeedScrobbleController.dbPush()
      
      //console.log(FeedScrobbleController.dbPull())
    
    });
  });

});