snappy.factory("ProfileService", function ($http, ACCESS_TOKEN) {
    return  {
        get: function(id, successCallback) {
            $http.jsonp("https://api.instagram.com/v1/users/" + id + "?access_token=" + ACCESS_TOKEN + "&callback=JSON_CALLBACK").
                success(function(data, status, headers, config) {
                    successCallback(data.data, status, headers, config);
                }).
                error(function(data, status, headers, config) {
                    console.log("ERROR: Could not get data.");
                    // TODO
                    // Broadcast Error Message
                });
        }
    }
});