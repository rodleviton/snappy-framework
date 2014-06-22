snappy.factory("FeedService", function ($http, ACCESS_TOKEN) {
    return  {
        get: function(id, successCallback) {
            $http.jsonp("https://api.instagram.com/v1/users/" + id + "/feed?access_token=" + ACCESS_TOKEN + "&callback=JSON_CALLBACK").
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