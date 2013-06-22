'use strict';

angular.module('angus.scrum.rbApp')
  .controller('TaskCtrl', function ($scope, $rootScope, $routeParams, Products, Stories, Tasks) {

    $scope.productId = $routeParams.productId;
    $scope.storyId = $routeParams.storyId;

    $rootScope.breadcrumbs = [
      {name: 'Home', path: '/'},
    ];

    $scope.story = Stories.get({id:$scope.storyId}, function(story) {
      Products.get({id:$scope.productId}, function(product) {
        $rootScope.breadcrumbs.push({name: product.label, path: '#/product/' + product.id + '/stories.html'});
        $rootScope.breadcrumbs.push({name: story.label});
      });
      console.log(story);
    });

    $scope.tasks = Tasks.query({story_id:$scope.storyId});

    $scope.edit = function(task) {
      $scope.task = task;
    };

    $scope.save = function() {
      $scope.task.story_id = $scope.storyId;
      if($scope.task.$save) {
        $scope.task.$save();
      } else {
        $scope.tasks.push(Tasks.create($scope.task));
      }
    };

    $scope.delete = function(task, $index, $event) {
      $event.stopPropagation();
      $scope.tasks.splice($index, 1);
      task.$destroy();
    };

    $rootScope.$on('dropEvent', function(evt, dragged, dropped) {
      var i, oldIndex1, oldIndex2;
      for(i=0; i<$scope.tasks.length; i++) {
        var c = $scope.tasks[i];
        if(dragged.id === c.id) {
          oldIndex1 = i;
        }
        if(dropped.id === c.id) {
          oldIndex2 = i;
        }
      }
      var temp = $scope.tasks[oldIndex1];
      $scope.tasks[oldIndex1] = $scope.tasks[oldIndex2];
      $scope.tasks[oldIndex2] = temp;
      $scope.tasks[oldIndex1].order = oldIndex1;
      $scope.tasks[oldIndex1].$save();
      $scope.tasks[oldIndex2].order = oldIndex2;
      $scope.tasks[oldIndex2].$save();
    });

  });
