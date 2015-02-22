var request = require('supertest');

describe('FeedTweetController', function() {

  describe('#push()', function() {
    it('should push tweets to db', function (done) {

      FeedTweetController.dbPush();
    
    });
  });

});