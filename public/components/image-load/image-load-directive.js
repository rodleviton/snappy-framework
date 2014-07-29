snappy.directive('imageLoad', function() {
   return {
       restrict: 'A',
       link: function(scope, element, attrs) {
           element.bind('load', function() {
              scope.$broadcast("imageLoaded"); // Let the app know when an image has been loaded
              element.addClass('in'); // Fade the image in using CSS
           });
       }
   }
});