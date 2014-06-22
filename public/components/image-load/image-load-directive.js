snappy.directive('imageLoad', function() {
   return {
       restrict: 'A',
       link: function(scope, element, attrs) {
           element.bind('load', function() {
              element.addClass('in');
           });
       }
   }
});