snappy.controller('ProfileFollowedByController', function ($scope, FollowedByService, $stateParams) {
    'use strict';

    FollowedByService.get($stateParams.id, function success(data){
        $scope.followedBy = data;
    });

});