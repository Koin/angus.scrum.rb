'use strict';

angular.module('angus.scrum.rbApp', ['ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/product/:productId/stories.html', {
        templateUrl: '/views/stories.html',
        controller: 'StoryCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('Products', function($resource) {
    return $resource('http://api.scrum.rb.dev/products/:id', {
      id: '@id'
    }, {
      get:      { method : 'GET' },
      query :   { method : 'GET', isArray : true },
      save :    { method : 'PUT' },
      create :  { method : 'POST' },
      destroy : { method : 'DELETE' }
    });
  })
  .factory('Stories', function($resource, $routeParams) {
    return $resource('http://api.scrum.rb.dev/products/' + $routeParams.productId + '/stories/:id', {
      id: '@id'
    }, {
      query :   { method : 'GET', isArray : true },
      save :    { method : 'PUT' },
      create :  { method : 'POST' },
      destroy : { method : 'DELETE' }
    });
  });
