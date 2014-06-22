snappy.controller('MainController', function ($scope, $http, ProfileService, FeedService) {
    'use strict';

    // Get current logged in user data
    ProfileService.get('self', function success(data){
        $scope.user = data;
    });

    // Get current logged in user feed
    FeedService.get('self', function success(data){
        $scope.feed = data;
        console.log($scope.feed);
    });

});