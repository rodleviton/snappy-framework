snappy.controller('ProfileFeedController', function ($scope, FeedService, $stateParams) {
    'use strict';

    if ( parseInt($scope.$storage.user_id, 10) === parseInt($stateParams.id, 10) ) {
        FeedService.get('self', function success(data){
            $scope.feed = data;
        });
    } else {
        console.log('Not authenticated user profile');
    }
});