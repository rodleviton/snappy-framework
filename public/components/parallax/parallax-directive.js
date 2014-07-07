snappy.directive('parallax', function() {
   return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(window).stellar(
                {
                    horizontalOffset: 0,
                    responsive: true,
                    hideDistantElements: false,
                    positionProperty: 'transform'
                }
            );

            $.stellar('refresh');
        }
    }
});