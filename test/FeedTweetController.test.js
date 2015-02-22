var assert = require('assert');
var FeedTweetController = require('../api/controllers/FeedTweetController.js');
var Sails = require('sails');

describe('FeedTweetController', function() {

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
      FeedTweetController.dbPush()
    
    });
  });

});