var assert = require('assert');
var FeedInstagramController = require('../api/controllers/FeedInstagramController.js');
var Sails = require('sails');

describe('FeedInstagramController', function() {

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
    it('should push tweets to db', function (done) {
      this.timeout(10000)
    
      console.log(app)
      FeedInstagramController.dbPush()
      //console.log(FeedTweetController.dbPull())
    
    });
  });

});