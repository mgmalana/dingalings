angular.module('starter.services', [])

// Snippets taken from: https://devdactic.com/user-auth-angularjs-ionic/
.service('AuthService', function($q, $http) {
  var LOCAL_STORED_USERNAME = 'locallyStoredUsername';
  var LOCAL_STORED_USERID = 'locallyStoredUserID';
  var API_ROOT = "http://172.20.10.3:3000"
  var userId = '';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;

  function loadUserCredentials() {
    var userId = window.localStorage.getItem(LOCAL_STORED_USERID);
    if (userId) { // If the token is existing, regardless if it's valid in the server or not.
      useCredentials(userId);
    }
  }

  function storeUserCredentials(_userId, _username) {
    window.localStorage.setItem(LOCAL_STORED_USERID, _userId);
    window.localStorage.setItem(LOCAL_STORED_USERNAME, _username);
    useCredentials(_userId);
  }

  function useCredentials(_userId) {
    userId = _userId;
    isAuthenticated = true;

    // Set the token as header for your requests
    // $http.defaults.headers.common['X-Auth-Token'] = token;
  }

  function destroyUserCredentials() {
    userId = undefined;
    username = '';
    isAuthenticated = false;
    
    window.localStorage.removeItem(LOCAL_STORED_USERID);
    window.localStorage.removeItem(LOCAL_STORED_USERNAME);
  }

  var login = function(paramUsername, paramPassword) {
    var data = {
      username: paramUsername,
      password: paramPassword
    };
    
    return $q(function(resolve, reject) {
      $http.post(API_ROOT + '/api/auth/signin', data).success(function (response) {
        console.log(response);
        storeUserCredentials(response._id, response.username);
        resolve(response);
      }).error(function (response) {
        reject(response);
      });
    });
  };

  var logout = function() {
    destroyUserCredentials();
  };

  var register = function(data) {
    return $q(function(resolve, reject) {
      $http.post(API_ROOT + '/api/auth/signup', data).success(function (response) {
        resolve(response);
      }).error(function (response) {
        reject(response);
      });
    });
  };

  var getStoredUsername = function() {
    var user = window.localStorage.getItem(LOCAL_STORED_USERNAME);
    
    if (user)
      return user;
    
    return '';
  };

  loadUserCredentials();

  return {
    login: login,
    logout: logout,
    register: register,
    getStoredUsername, getStoredUsername,
    isAuthenticated: function() { return isAuthenticated; },
    linkApi: function() {return API_ROOT; },
    username: function() { return username; },
    role: function() { return role; }
  };

})

.factory('Camera', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }

})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
