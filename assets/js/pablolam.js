angular.module('pablolam', ['ngResource', 'infinite-scroll', 'ngAnimate', 'duScroll', 'directives.skrollr'])

.controller('FeedController', ['$scope', '$resource', '$timeout', '$templateCache', '$document',
  function($scope, $resource, $timeout, $templateCache, $document) {

  $scope.infiniteDisabled = true;
  $scope.infiniteBusy = false;
  $scope.navbarShow = true;

  $scope.showTwit = true;
  $scope.showInstagram = true;
  $scope.showScrobble = true;
  
  var Json = $resource('/feed/dbPull');
  
  //QUERY FUNCTIONS
  var json = Json.query(function() {
  
    $scope.pabloFeed = []
    $scope.pabloFeed.push(json[$scope.pabloFeed.length])
    $scope.pabloFeed.push(json[$scope.pabloFeed.length])
    $scope.pabloFeed.push(json[$scope.pabloFeed.length])
    $scope.pabloFeed.push(json[$scope.pabloFeed.length])
    $scope.pabloFeed.push(json[$scope.pabloFeed.length])
    $scope.pabloFeed.push(json[$scope.pabloFeed.length])
    $scope.pabloFeed.push(json[$scope.pabloFeed.length])

    $scope.loadMore = function() {
      
      if ($scope.infiniteBusy == false){
      
      $scope.infiniteBusy = true;
      console.log("stop!")
      
        $timeout(function(){
          $scope.infiniteBusy = false;
          console.log("go!")
          $scope.infiniteDisabled = false;
          $scope.pabloFeed.push(json[$scope.pabloFeed.length])
          $scope.pabloFeed.push(json[$scope.pabloFeed.length])
          $scope.pabloFeed.push(json[$scope.pabloFeed.length])
          $scope.pabloFeed.push(json[$scope.pabloFeed.length])
          $scope.pabloFeed.push(json[$scope.pabloFeed.length])
          
        },1000).then( function() {})
      }
    }
  
  })
  
  //FILTER FUNCTIONS
  $scope.filterByType = function(block){
    switch (block.type) {
      case "twitter":
        if ($scope.showTwit) {return block}
        break
      case "instagram":
        if ($scope.showInstagram) {return block}
        break
      case "lastfm":
        if ($scope.showScrobble) {return block}
        break
    }
  }
  
  $scope.toggleTwit = function(){
    $scope.showTwit = !$scope.showTwit
  }
  $scope.toggleInstagram = function(){
    $scope.showInstagram = !$scope.showInstagram
  }
  $scope.toggleScrobble = function(){
    $scope.showScrobble = !$scope.showScrobble
  }
  
  //SCROLL FUNCTIONS
  function easeInQuad(t) {
    return 1+(--t)*t*t*t*t;
  }
  
  $scope.goToTop = function() {
    $document.scrollTopAnimated(0, 500, easeInQuad).then(function() {});
  }
  
}]);