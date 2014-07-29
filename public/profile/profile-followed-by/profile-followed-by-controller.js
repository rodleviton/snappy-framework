snappy.controller('ProfileFollowedByController', function ($scope, followers) {
    'use strict';

    $scope.followedBy = followers.data;
});