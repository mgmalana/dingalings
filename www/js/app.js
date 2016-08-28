// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyBvu18ae8KqlGXYe7tI4r55kwhy1jMk5xw',
    v: '3', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('dash', {
    url: '/dash',
    templateUrl: 'templates/tab-dash.html',
    controller: 'DashCtrl'
  })

  // State route for Kiosk Locator
  .state('map', {
    url: '/map',
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl'
  })

  // State route for Kiosk Locator
  .state('report-issue', {
    url: '/issue',
    templateUrl: 'templates/report-issue.html',
    controller: 'IssueCtrl'
  })

  // State route for Kiosk Locator
  .state('identify', {
    url: '/identify',
    templateUrl: 'templates/identify.html',
    controller: 'IdentifyCtrl'
  })

  // State route for Kiosk Locator
  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html'
  })

  .state('prompt', {
    url: '/prompt',
    templateUrl: 'templates/prompt.html',
    controller: 'PromptCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/dash');

});
