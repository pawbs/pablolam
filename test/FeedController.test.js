var assert = require('assert');
var FeedController = require('../api/controllers/FeedController.js');
var Sails = require('sails');

describe('FeedController', function() {

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
      FeedController.dbPush()
      //console.log(FeedController.dbPull())
    
    });
  });

});