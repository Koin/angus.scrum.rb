'use strict';

angular.module('angus.scrum.rbApp')
  .controller('StoryCtrl', function ($scope, $rootScope, $routeParams, Products, Stories) {

    $scope.productId = $routeParams.productId;
    $scope.product = Products.get({id:$scope.productId});
    $scope.stories = Stories.query({productId:$scope.productId});

    $scope.edit = function(story) {
      $scope.story = story;
    };

    $scope.save = function() {
      $scope.story.productId = $scope.productId;
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

    $rootScope.$on('dropEvent', function(evt, dragged, dropped) {
      var i, oldIndex1, oldIndex2;
      for(i=0; i<$scope.stories.length; i++) {
        var c = $scope.stories[i];
        if(dragged.id === c.id) {
          oldIndex1 = i;
        }
        if(dropped.id === c.id) {
          oldIndex2 = i;
        }
      }
      var temp = $scope.stories[oldIndex1];
      $scope.stories[oldIndex1] = $scope.stories[oldIndex2];
      $scope.stories[oldIndex2] = temp;
      $scope.stories[oldIndex1].order = oldIndex1;
      $scope.stories[oldIndex1].$save();
      $scope.stories[oldIndex2].order = oldIndex2;
      $scope.stories[oldIndex2].$save();
    });

  });
