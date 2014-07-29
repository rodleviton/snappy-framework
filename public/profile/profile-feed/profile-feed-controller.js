snappy.controller('ProfileFeedController', function ($scope, feed) {
    'use strict';
    $scope.MAX_COMMENT_COUNT = 4;

    $scope.feed = feed.data;

    console.log($scope.feed);
});