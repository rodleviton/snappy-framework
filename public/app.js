var snappy = angular.module('snappy', ['ui.router', 'ngResource', 'ngAnimate', 'angularMoment', 'ngStorage', 'angularFileUpload'])
    .constant("ACCESS_TOKEN", "1387439922.a836a11.398dcb355bc54a2d91e8e6fc98ccc206")
    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';

        // Redirect to my own feed
        $urlRouterProvider.otherwise("/1387439922/feed");

        $stateProvider.state('index', {
            url: "/",
            templateUrl: "main/main.html",
            controller: 'MainController'
        }).state('post', {
            url: "^/post",
            templateUrl: "post/post.html",
            controller: 'PostController'
        }).state('profile', {
            url: "/:id",
            templateUrl: "profile/profile.html",
            controller: 'ProfileController',
            resolve: {
                // A string value resolves to a service
                UserService: 'UserService',

                user: function($stateParams, UserService) {
                    return UserService.get({id: $stateParams.id}).$promise;
                }
            }
        }).state('profile.feed', {
            url: "/feed",
            templateUrl: "profile/profile-feed/profile-feed.html",
            controller: 'ProfileFeedController',
            resolve: {
                // A string value resolves to a service
                FeedService: 'FeedService',

                feed: function(FeedService) {
                    return FeedService.get().$promise;
                }
            }
        }).state('profile.media', {
            url: "/media",
            templateUrl: "profile/profile-media/profile-media.html",
            controller: 'ProfileMediaController',
            resolve: {
                // A string value resolves to a service
                MediaService: 'MediaService',

                media: function($stateParams, MediaService) {
                    return MediaService.get({id: $stateParams.id}).$promise;
                }
            }
        }).state('profile.follows', {
            url: "/follows",
            templateUrl: "profile/profile-follows/profile-follows.html",
            controller: 'ProfileFollowsController',
            resolve: {
                // A string value resolves to a service
                FollowsService: 'FollowsService',

                follows: function($stateParams, FollowsService) {
                    return FollowsService.get({id: $stateParams.id}).$promise;
                }
            }
        }).state('profile.followed-by', {
            url: "/followed-by",
            templateUrl: "profile/profile-followed-by/profile-followed-by.html",
            controller: 'ProfileFollowedByController',
            resolve: {
                // A string value resolves to a service
                FollowedByService: 'FollowedByService',

                followers: function($stateParams, FollowedByService) {
                    return FollowedByService.get({id: $stateParams.id}).$promise;
                }
            }
        });
    });