'use strict';

angular.module('angus.scrum.rbApp')
  .controller('StoryCtrl', function ($scope, $routeParams, Products, Stories) {

    $scope.product = Products.get({id:$routeParams.productId});

    $scope.stories = Stories.query();

    $scope.edit = function(story) {
      $scope.story = story;
    };

    $scope.save = function() {
      if($scope.story.$save) {
        $scope.story.$save();
      } else {
        $scope.stories.push(Stories.create($scope.story));
      }
    };

    $scope.delete = function(story, $index, $event) {
      $event.stopPropagation();
      $scope.stories.splice($index, 1);
      story.$destroy();
    };

  });
