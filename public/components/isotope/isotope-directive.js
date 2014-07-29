snappy.directive('isotope', function() {
   return {
       restrict: 'A',
       controller: function($scope, $element, $attrs, $timeout) {

            // Initialise everything when all items are loaded into the DOM
           if ($scope.$last) {
                $timeout(function() {

                    // Initialise packery plugin
                    var $container = $('.isotope-container').packery({
                      itemSelector: '.isotope-item',
                      columnWidth: '.grid-sizer',
                      gutter: ".gutter-sizer"
                    });

                    // When all images are loaded relayout
                    imagesLoaded( document.querySelector('.isotope-container'), function( instance ) {

                        $container.packery();
                    });

                }, 0);
            }

            $scope.$on('imageLoaded', function(event) {
                //console.log('imageLoaded');
            });
        }
   }
});