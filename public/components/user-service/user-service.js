snappy.factory("UserService", function ($resource, ACCESS_TOKEN) {
    return $resource("https://api.instagram.com/v1/users/" + ":id" + "?access_token=" + ACCESS_TOKEN, { id: '@id'},
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