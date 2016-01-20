'use strict';

/**
 * @ngdoc overview
 * @name codeChallengeApp
 * @description
 * # codeChallengeApp
 *
 * Main module of the application.
 */
angular
  .module('codeChallengeApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'mainctrl'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl',
        controllerAs: 'gamectrl'
      })
      .otherwise({
        redirectTo: 'views/404.html'
      });
  });
