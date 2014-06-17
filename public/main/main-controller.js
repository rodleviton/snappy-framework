angular.module('snappy', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';

        $stateProvider.state('main', {
            url: "/",
            templateUrl: "main/main.html",
            controller: 'MainController'
        });

    }).controller('MainController', function ($scope, $stateParams, $http) {
        console.log('Main Controller');

        console.log(sessionStorage.getItem('access_token'));
        var access_token = sessionStorage.getItem('access_token');

        $http.jsonp("https://api.instagram.com/v1/users/self?access_token=1387439922.a836a11.398dcb355bc54a2d91e8e6fc98ccc206&callback=JSON_CALLBACK").
        success(function (data, status, headers, config) {
            $scope.user = data.data;

        }).
        error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });


        $http.jsonp("https://api.instagram.com/v1/users/self/feed?access_token=1387439922.a836a11.398dcb355bc54a2d91e8e6fc98ccc206&callback=JSON_CALLBACK").
        success(function (data, status, headers, config) {

            console.log(data);

            $scope.items = data.data;
            // this callback will be called asynchronously
            // when the response is available
        }).
        error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    });