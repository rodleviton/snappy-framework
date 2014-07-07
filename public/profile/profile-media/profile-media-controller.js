snappy.controller('ProfileMediaController', function ($scope, MediaService, $stateParams) {
    'use strict';

    MediaService.get($stateParams.id, function success(data){
        $scope.feed = data;
    });

});