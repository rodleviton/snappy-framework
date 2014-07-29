snappy.controller('ProfileFollowsController', function ($scope, follows) {
    'use strict';

    $scope.follows = follows.data;
});