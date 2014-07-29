snappy.factory("FeedService", function ($resource, ACCESS_TOKEN) {
    return $resource("https://api.instagram.com/v1/users/self/feed?access_token=" + ACCESS_TOKEN, {},
       {
            get: {
                method: 'JSONP',
                params: {
                    callback: 'JSON_CALLBACK'
                }
            }
       }
    );
});