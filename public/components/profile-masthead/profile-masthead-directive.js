snappy.directive('profileMasthead', function() {
   return {
       restrict: 'E',
       replace: true,
       templateUrl: '/components/profile-masthead/profile-masthead.html',
       link: function(scope, element, attrs) {
            element.css('background-image', 'url(' + attrs.src + ')');
       }
    }
});