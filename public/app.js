var snappy = angular.module('snappy', ['ui.router'])
    .constant("ACCESS_TOKEN", "1387439922.a836a11.398dcb355bc54a2d91e8e6fc98ccc206")
    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';

        $urlRouterProvider.otherwise("/");

        $stateProvider.state('/', {
            url: "/",
            templateUrl: "main/main.html",
            controller: 'MainController'
        });

    });