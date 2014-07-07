snappy.controller('ProfileController', function ($scope, ProfileService, $stateParams, $localStorage) {
    'use strict';

    // Store authenticated user id in local storage
    $scope.$storage = $localStorage.$default({
        user_id: 1387439922
    });

    // Get current user basic data
    ProfileService.get($stateParams.id, function success(data){
        $scope.user = data;
    });

});