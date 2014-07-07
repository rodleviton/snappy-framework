snappy.directive('summaryNav', function($location) {
   return {
       restrict: 'E',
       replace: true,
       templateUrl: '/components/summary-nav/summary-nav.html',
       link: function(scope, element, attrs) {
            scope.isActive = function (location) {
                return location === $location.path();
            };
       }
    }
});