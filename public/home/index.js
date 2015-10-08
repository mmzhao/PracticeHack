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

  // angular.extend($scope, {
  //   defaults: {
  //       tileLayer: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
  //       maxZoom: 14,
  //       path: {
  //           weight: 10,
  //           color: '#800000',
  //           opacity: 1
  //       }
  //   },
  //   center: {
  //       lat: 51.505,
  //       lng: -0.09,
  //       zoom: 8
  //   }
  // });

  // leafletData.getMap().then(function(map) {
  //   L.GeoIP.centerMapOnPosition(map, 15);
  // });

}]);






