snappy.controller('ProfileController', function ($scope, user) {
    'use strict';
    $scope.user = user.data;
});