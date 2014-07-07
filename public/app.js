var snappy = angular.module('snappy', ['ui.router', 'angularMoment', 'ngStorage'])
    .constant("ACCESS_TOKEN", "1387439922.a836a11.398dcb355bc54a2d91e8e6fc98ccc206")
    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';
        $urlRouterProvider.otherwise("/1387439922/feed");

        $stateProvider.state('index', {
            url: "/",
            templateUrl: "main/main.html",
            controller: 'MainController'
        }).state('profile', {
            url: "/:id",
            templateUrl: "profile/profile.html",
            controller: 'ProfileController'
        }).state('profile.feed', {
            url: "/feed",
            templateUrl: "profile/profile-feed/profile-feed.html",
            controller: 'ProfileFeedController'
        }).state('profile.media', {
            url: "/media",
            templateUrl: "profile/profile-media/profile-media.html",
            controller: 'ProfileMediaController'
        }).state('profile.follows', {
            url: "/follows",
            templateUrl: "profile/profile-follows/profile-follows.html",
            controller: 'ProfileFollowsController'
        }).state('profile.followed-by', {
            url: "/followed-by",
            templateUrl: "profile/profile-followed-by/profile-followed-by.html",
            controller: 'ProfileFollowedByController'
        });
    });