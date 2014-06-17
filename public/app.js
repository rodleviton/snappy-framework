angular.module('snappy', [ 'ui.router' ])
  .config(function ($stateProvider, $urlRouterProvider) {
    'use strict';

    $urlRouterProvider.otherwise("/");

  });
