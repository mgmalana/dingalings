angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, AuthService, $ionicPopup) {
  $scope.data = {};

  $scope.authentication = null;
  $scope.error = null;
  $scope.isRequesting = false;

  $scope.data.username = AuthService.getStoredUsername();

  $scope.login = function() {
    $scope.isRequesting = true;

    AuthService.login($scope.data.username, $scope.data.password).then(function(authenticated) {
      $state.go('tab.chats', {}, {reload: true});
      $scope.isRequesting = false;
    }, function(err) {
      console.log(err);
      var alertPopup = $ionicPopup.alert({
        title: 'Login Failed',
        template: err.errors.message
      });
      $scope.isRequesting = false;
    });
  };
})

.controller('DashCtrl', function($scope, $state, AuthService) {
  
})

.controller('ChatsCtrl', function($scope, Chats, Camera) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  $scope.getPicture = function(options) {
    var options = {
      quality : 75,
      targetWidth: 200,
      targetHeight: 200,
      sourceType: 0
    };

    Camera.getPicture(options).then(function(imageData) {
      $scope.picture = imageData;
    }, function(err) {
      console.log(err);
    });
  };

  $scope.takePicture = function(options) {
    var options = {
      quality : 75,
      targetWidth: 200,
      targetHeight: 200,
      sourceType: 1
    };

    Camera.getPicture(options).then(function(imageData) {
      $scope.picture = imageData;
    }, function(err) {
      console.log(err);
    });
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('IssueCtrl', function($scope, $stateParams, $http, AuthService, $cordovaGeolocation) {
  $scope.issue = {};

  $scope.lat = 'asd';
  console.log('ay');

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      console.log('lat: ' + lat);
      console.log('long: ' + long);
      $scope.lat = lat;
      $scope.long = long;
    }, function(err) {
      $scope.lat = err;
    });

  /*$http.post(AuthService.linkApi + '/api/issues', $scope.issue).success(function (response) {

  }).error(function(response) {

  });*/
})

.controller('AccountCtrl', function($scope, uiGmapGoogleMapApi) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.map = { center: { latitude: 14.165507, longitude: 121.239502 }, zoom: 16 };

  uiGmapGoogleMapApi.then(function(maps) {
    // $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  });
})

.controller('MapCtrl', function($scope, $state, $ionicLoading, $compile, $ionicPlatform, $ionicPopup, uiGmapGoogleMapApi) {
  // $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvu18ae8KqlGXYe7tI4r55kwhy1jMk5xw&sensor=true";

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  });

  /*$ionicPlatform.ready(function() {
    if(window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
          $ionicPopup.confirm({
            title: "Internet Disconnected",
            content: "The internet is disconnected on your device."
          })
          .then(function(result) {
            if(!result) {
              ionic.Platform.exitApp();
            }
          });
        } else {
          initialize();
          google.maps.event.addDomListener(window, 'load', initialize);
        }
    }
  });

  function initialize() {
    var myLatlng = new google.maps.LatLng(43.07493,-89.381388);

    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

    //Marker + infowindow + angularjs compiled ng-click
    var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Uluru (Ayers Rock)'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    $scope.map = map;
  }

  $scope.centerOnMe = function() {
    if(!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  $scope.clickTest = function() {
    alert('Example of infowindow with ng-click')
  };*/
});
