app = angular.module('practice');

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { // home page and tabs
      url: '/home',
      views: {
        '': {
          templateUrl: '/home/home.html',
          controller: 'ProductCtrl',
          resolve: {
            practicePromise: ['Backend', function(Backend) {
              return Backend.getPractices();
            }],
            // notesPromise: ['UCCEs', function(UCCEs) {
            //   return UCCEs.getNotes();
            // }]
          }
        },
      }
    });

  $urlRouterProvider.otherwise('home'); // unknown urls default to home page
}]);