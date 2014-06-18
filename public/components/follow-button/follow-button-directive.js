snappy.directive('profile', function(ProfileService) {
   return {
       restrict: 'E',
       replace: true,
       templateUrl: '/components/profile/profile.html',
       link: function(scope, element, attrs) {
            ProfileService.get('self', function success(data){
                scope.user = data;
            });
       }
    }
});