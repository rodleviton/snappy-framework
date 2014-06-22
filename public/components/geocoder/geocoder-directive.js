snappy.directive('geocoder', function($timeout, GeocoderService) {
    return {
        restrict: 'E',
        template: '<span>{{location}}</span>',
        replace: false,
        controller: function($scope, $element, $attrs) {
            $attrs.$observe('geocode', function(value) {
                GeocoderService.addressForLatLng($attrs.geocoderLatitude, $attrs.geocoderLongitude).then(function (data) {
                    //console.log($attrs);
                    console.log(data);
                    $scope.location = data.address[1].formatted_address
                });
            });

        }
    }
});