angular.module('pablolam', ['ngResource', 'infinite-scroll', 'ngAnimate', 'duScroll', 'directives.skrollr', 'mediaPlayer'])

.controller('FeedController', ['$scope', '$resource', '$timeout', '$templateCache', '$document',
  function($scope, $resource, $timeout, $templateCache, $document) {

  $scope.infiniteDisabled = true
  $scope.infiniteBusy = false
  $scope.navbarShow = true

  $scope.showTwit = true
  $scope.showInstagram = true
  $scope.showScrobble = true
  $scope.showPlaylist = false
  $scope.showAbout = false
  
  $scope.playlist = []
  $scope.music = []
  $scope.playlistqueue = []
  
  $scope.currentSong = ""
  
  $scope.repeatOne = false
  $scope.repeatAll = false
  $scope.shuffle = false
  
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
      //console.log("stop!")
      
        $timeout(function(){
          $scope.infiniteBusy = false;
          //console.log("go!")
          $scope.infiniteDisabled = false;
          $scope.pabloFeed.push(json[$scope.pabloFeed.length])
          $scope.pabloFeed.push(json[$scope.pabloFeed.length])
          $scope.pabloFeed.push(json[$scope.pabloFeed.length])
          $scope.pabloFeed.push(json[$scope.pabloFeed.length])
          $scope.pabloFeed.push(json[$scope.pabloFeed.length])
          
        },1000).then( function() {})
      }
    }
    
    $scope.music = json.filter(function (el) {
      return el.type == "lastfm"
    });
  
    //MUSIC INITIALIZATION STUFF
    $scope.playAll()
    
    //REPEAT AND SHUFFLE EVENTS
    $scope.audio1.on('ended', function (evt) {
      console.log("ended")
      console.log($scope.audio1.currentTrack)
      if ($scope.repeatOne) {
        $scope.audio1.playPause($scope.audio1.currentTrack - 1, true)
      }
      else {
        $scope.next()
      }

    })
    
    $scope.next = function(x) {
      if ($scope.audio1.currentTrack == $scope.playlist.length) {
        if ($scope.repeatAll) {
          $scope.audio1.playPause(0, true)
        }
      }
      else {
        $scope.audio1.playPause($scope.audio1.currentTrack)
      }
    }
    
    $scope.prev = function(x) {
      if ($scope.audio1.currentTime > 3) {
        $scope.audio1.seek(0)
      }
      else {
        if ($scope.repeatAll){
          if ($scope.audio1.currentTrack == 1) {
            $scope.audio1.playPause($scope.playlist.length - 1, true)
          }
          else {
            $scope.audio1.playPause($scope.audio1.currentTrack - 2)
          }
        }
      }
    }
  
  })
  
  //FILTER FUNCTIONS
  $scope.filterByType = function(block){
    switch (block.type) {
      case "music":
        if ($scope.showPlaylist) {return block}
        break
      case "about":
        if ($scope.showAbout) {return block}
        break
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
  
  //TOGGLES
  $scope.toggleAbout = function() {
    $scope.showAbout = !$scope.showAbout
  }
  
  $scope.toggleSocial = function(){
    $scope.showTwit = !$scope.showTwit
    $scope.showInstagram = !$scope.showInstagram
  }
  
  $scope.togglePlaylist = function(){
    $scope.showPlaylist = !$scope.showPlaylist
  }
  
  $scope.toggleScrobble = function(){
    $scope.showScrobble = !$scope.showScrobble
  }
  
  $scope.toggleRepeat = function() {
    if (!($scope.repeatOne || $scope.repeatAll)){
      $scope.repeatAll = true
    }
    else if ($scope.repeatAll) {
      $scope.repeatAll = false
      $scope.repeatOne = true
    }
    else {
      $scope.repeatOne = false
    }
  }
  
  $scope.toggleShuffle = function() {
    $scope.shuffle = !$scope.shuffle
    if ($scope.shuffle){
      //shuffle
      curTrack = $scope.playlist[$scope.audio1.currentTrack - 1]
      
      //..And then persist first song
      $scope.playlist = $scope.shuffleList($scope.playlist)
      $scope.playlist[$scope.playlist.indexOf(curTrack)] = $scope.playlist[0]
      $scope.playlist[0] = curTrack
    }
    else {
      $scope.playAll()
    }
  }
  
  //SCROLL FUNCTIONS
  function easeInQuad(t) {
    return 1+(--t)*t*t*t*t;
  }
  
  $scope.goToTop = function() {
    $document.scrollTopAnimated(0, 500, easeInQuad).then(function() {});
  }
  
  //QUERY COLOR FUNCTIONS
  $scope.getStyleFromIndex = function(index, stars) {
  
    switch(index % 4){
      case 0:
        color = "#00CCFF"
        break
      case 1:
        color = "#00FF00"
        break
      case 2:
        color = "#FFFF00"
        break
      case 3:
        color = "#ffC000"
        break
    }
    
    if (stars > 0) {return "{'background-color': '" + color +  "'}"}
    else {return "{'color': '" + color +  "'}"}
  }
  
  //MUSIC FUNCTIONS
  $scope.playAll = function() {
    for (var i = 0; i < $scope.music.length; i++) {
      $scope.playlist[i] = {}
      $scope.playlist[i].src = "../mp3/" + $scope.music[i].text + ".mp3"
      $scope.playlist[i].type = "audio/mp3"
    }
  }
  
  $scope.shuffleList = function (o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }  
  
  
  $scope.seekPercentage = function ($event) {
    var percentage = ($event.offsetX / window.innerWidth);
    
    if (percentage <= 1) {
      return percentage;
    } else {
      return 0;
    }
  }
  
  $scope.playCurrent = function (data) {
    for (var i = 0; i < $scope.playlist.length; i++) {
      if ($scope.playlist[i].src.indexOf(data) > -1) {
        return i
      }
    } 
  }
  
  $scope.progressBarStyle = function (curTime, durTime) {
    if (curTime == undefined) return 0
    return curTime*100/durTime
  }
  
  
  
}]);