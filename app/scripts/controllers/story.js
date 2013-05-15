'use strict';

angular.module('angus.scrum.rbApp')
  .controller('StoryCtrl', function ($scope, Stories) {

    $scope.stories = Stories.query();

  });
