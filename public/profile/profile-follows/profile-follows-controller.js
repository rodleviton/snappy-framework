snappy.controller('ProfileFollowsController', function ($scope, FollowsService, $stateParams) {
    'use strict';

    FollowsService.get($stateParams.id, function success(data){
        $scope.follows = data;
    });

});