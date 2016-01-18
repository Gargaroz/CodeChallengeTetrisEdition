'use strict';

/**
 * @ngdoc function
 * @name codeChallengeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the codeChallengeApp
 */
angular.module('codeChallengeApp')
  .controller('GameCtrl', ['$scope', 'PlayerService', function ($scope, PlayerService) {
  	var vm = this;
  	vm.playerName = PlayerService.getName();
  	vm.playerSign = PlayerService.getSign();
  }]);
