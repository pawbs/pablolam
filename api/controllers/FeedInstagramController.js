/**
 * FeedInstagramController
 *
 * @description :: Server-side logic for managing Feedinstagrams
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var ig = require('instagram-node-lib');
 
module.exports = {
	

  /**
   * `FeedInstagramController.dbPush()`
   */
  dbPush: function (req, res) {

    ig.set('client_id', '3318adad30cc4c458aa8b8b5026cc657');
    ig.set('client_secret', 'aaab2c9d4e4d4ffe8a2e53bd2320226c');

    ig.tags.info({
      name: 'blue',
      complete: function(data){
        console.log(data);
      }
    });
    
  
  },


  /**
   * `FeedInstagramController.dbPull()`
   */
  dbPull: function (req, res) {

  
  
  }
};

