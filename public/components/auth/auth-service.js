snappy.factory("AuthService", function ($http) {
    return  {
        login: function() {
            console.log('login');
            window.location.href = "https://instagram.com/oauth/authorize/?client_id=a836a11161e2487fa4a766977f302353&redirect_uri=http%3A%2F%2Fsnappy-framework.boxedorange.com%2F%23%2F&response_type=token&scope=likes+comments+relationships";
        }
    }
});