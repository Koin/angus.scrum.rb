'use strict';

angular.module('angus.scrum.rbApp')
  .controller('MainCtrl', function ($scope, Products) {

    $scope.products = Products.query();

    $scope.edit = function(product) {
      $scope.product = product;
    };

    $scope.save = function() {
      if($scope.product.$save) {
        $scope.product.$save();
      } else {
        $scope.products.push(Products.create($scope.product));
      }
    };

    $scope.delete = function(product, $index, $event) {
      $event.stopPropagation();
      $scope.products.splice($index, 1);
      product.$destroy();
    };

  });
