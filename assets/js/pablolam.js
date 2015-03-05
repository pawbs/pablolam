angular.module('pablolam', ['ngResource', 'infinite-scroll'])

.controller('FeedController', ['$scope', '$resource', function($scope, $resource) {

  var Json = $resource('/feed/dbPull');
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
      $scope.pabloFeed.push(json[$scope.pabloFeed.length])
    }
  
  })
  

  
  

  
  
}]);