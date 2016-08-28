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
      $state.go('tab.dash', {}, {reload: true});
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
  $scope.goToState = function(state) {
    $state.go(state, {}, {reload: true});
  };
})

.controller('ChatsCtrl', function($scope, Chats, Camera) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // $scope.chats = Chats.all();
  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
  // };

  $scope.trees = [
    {
      name:"Palmate",
      picture:"img/Cards-01.png",
      nextlevel:[
        {
          name:"Apocynaceae",
          picture:"img/Cards-06.png",
        },
        {
          name:"Verbenaceae",
          picture:"img/Cards-07.png",
        },
        { 
          name: "Bombacaceae",
          picture: "img/Cards-08.png",
        },
        {
          name:"Caricaceae",
          picture: "img/Cards-09.png",
        }
      ]
    },
    {
      name:"Cards-02.png",
      picture:"",
      nextlevel:[
        {
          name:"Leguminosae (Papilionoideae)",
          picture: "img/Cards-12.png",
        },
        {
          name:"Euphorbiaceae",
          picture: "img/Cards-11.png",
        },
        { 
          name:"Rutaceae",
          picture: "img/Cards-10.png"
        },
        {
          name:"Myrtaceae",
          picture: ""
        } 
      ]
    },
    {
      name:"Opposite single",
      picture: "img/Cards-03.png"
    },
    {
      name:"Pinnate",
      picture: "img/Cards-04.png"
    },
    {
      name:"Alternate single",
      picture: "img/Cards-05.png"
    }    
  ];

  function getPicture(tree){
    return tree.picture;
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

  $scope.chooseTree = function (tree){
    if(tree.hasOwnProperty('nextlevel')){
      $scope.trees = tree.nextlevel;
      console.log($scope.trees);
      $scope.safeApply();
    } else {
      console.log("genus found: " + tree.name);
    }
  }

  $scope.safeApply = function(fn) {
  var phase = this.$root.$$phase;
  if(phase == '$apply' || phase == '$digest') {
    if(fn && (typeof(fn) === 'function')) {
      fn();
    }
  } else {
    this.$apply(fn);
  }
};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('IssueCtrl', function($scope, $stateParams, $http, AuthService, $ionicPopup) {
  $scope.showAlert = function(title, message) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: message
   });
  };

  $scope.isEnabled = false;

  navigator.geolocation.getCurrentPosition(function(pos) {
    $scope.isEnabled = true;
    $scope.coords = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    };
  }, function(error) {
    $scope.showAlert('Error', 'We couldn\'t retrieve your location.');
  });

  $scope.sendReport = function(reportType) {
    if ($scope.coords) {
      $scope.issue = {
        title: reportType,
        content: '',
        latitude: $scope.coords.latitude,
        longitude: $scope.coords.longitude
      };

      console.log(AuthService.linkApi);
      $http.post(AuthService.linkApi + '/api/issues', $scope.issue).success(function(response) {
        $scope.showAlert('Success', 'We sent your issue to the authorities');
      }).error(function(response) {
        $scope.showAlert('Error', 'Sorry! We couldn\'t communicate with the servers');
      });
    } else {
      $scope.showAlert('Error', 'We couldn\'t track your coordinates');
    }
  };
  /*$scope.issue = {};

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
    });*/

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

.controller('PromptCtrl', function($scope, $state) {
  $scope.goToState = function(state) {
    if (state === 'identify') {
      $state.go('identify', {}, {reload: true});
    } else {
      $state.go('report-issue', {}, {reload: true});
    }
  };
})

.controller('MapCtrl', function($scope, $state, $ionicLoading, $compile, $ionicPlatform, $ionicPopup, uiGmapGoogleMapApi, $ionicPopup) {
  $scope.showAlert = function(title, message) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: message
   });

   alertPopup.then(function(res) {
     // console.log('Thank you for not eating my delicious ice cream cone');
   });
  };

  $scope.show = function() {
    $ionicLoading.show({
      template: 'Tracking your location...'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
  };

  // $scope.showAlert('Eyy', 'Platform is ' + ionic.Platform.platform() + ' // isIOS: ' + ionic.Platform.isIOS());
  $scope.show();
  $scope.places = [];
  // $scope.map = { center: { latitude: 24, longitude: 57 }, zoom: 16 };
  $scope.map = { center: { latitude: 14.165507, longitude: 121.239502 }, zoom: 16 };
  console.log(ionic.Platform.platform());

  var currentPlatform = ionic.Platform.platform();
  var currentPlatformVersion = ionic.Platform.version();
  uiGmapGoogleMapApi.then(function(maps) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.hide();
        $scope.map = { center: { latitude: pos.coords.latitude, longitude: pos.coords.longitude }, zoom: 16 };
        // $scope.loading.hide();
        // $scope.showAlert('Eyy found u', 'lat: ' + pos.coords.latitude + ' : long: ' + pos.coords.longitude);
        $scope.marker = {
          id: 0,
          coords: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          },
          options: {
            icon: 'img/Identreefy-16-xs.png'
          }
        };
        var place = {
          id: 0,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          title: 'Hey'
        };

        $scope.places.push(place);
        console.log($scope.marker);
      }, function(error) {
        $scope.showAlert('Web Error', error.message);
      });
  });

  $scope.clickedLocation = function() {
    console.log('af');
    $state.go('prompt', {}, {reload: true});
  };
});
