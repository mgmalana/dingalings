angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
