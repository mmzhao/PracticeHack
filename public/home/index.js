var app = angular.module('practice', ['ui.router','ui.bootstrap']);


// factory for all http requests connecting to api
app.factory('Backend', ['$http', '$window', function($http, $window) {
  var backend = {
    practices: []
  };

  backend.getPractices = function() {
    return $http.get('/api/practices').success(function(data) {
      angular.copy(data, backend.practices);
    }).error(function(error) {
      alert("ERROR: " + error);
    });
  };
  

  return backend;
}]);


app.controller('ProductCtrl', ['$scope', '$window', 'Backend', function($scope, $window, backend){
  $scope.practices = backend.practices;
  $scope.messages = [];
  for(var i = 0; i < $scope.practices.length; i++) {
    $scope.messages.push($scope.practices[i].message);
  }
}]);






