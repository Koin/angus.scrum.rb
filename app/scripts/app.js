'use strict';

var apiServer = 'api-scrum-rb.herokuapp.com';

angular.module('angus.scrum.rbApp', ['ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/products.html',
        controller: 'ProductCtrl'
      })
      .when('/product/:productId/stories.html', {
        templateUrl: '/views/stories.html',
        controller: 'StoryCtrl'
      })
      .when('/product/:productId/story/:storyId/tasks.html', {
        templateUrl: '/views/tasks.html',
        controller: 'TaskCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('Products', function($resource) {
    return $resource('http://' + apiServer + '/products/:id', {
      id: '@id'
    }, {
      get:      { method : 'GET' },
      query :   { method : 'GET', isArray : true },
      save :    { method : 'PUT' },
      create :  { method : 'POST' },
      destroy : { method : 'DELETE' }
    });
  })
  .factory('Stories', function($resource) {
    return $resource('http://' + apiServer + '/stories/:id', {
      id: '@id'
    }, {
      query :   { method : 'GET', isArray : true },
      save :    { method : 'PUT' },
      create :  { method : 'POST' },
      destroy : { method : 'DELETE' }
    });
  })
  .factory('Tasks', function($resource) {
    return $resource('http://' + apiServer + '/tasks/:id', {
      id: '@id'
    }, {
      query :   { method : 'GET', isArray : true },
      save :    { method : 'PUT' },
      create :  { method : 'POST' },
      destroy : { method : 'DELETE' }
    });
  });
