'use strict';

/**
 * @ngdoc function
 * @name codeChallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the codeChallengeApp
 */
angular.module('codeChallengeApp')
  .controller('MainCtrl', ['$scope', 'PlayerFactory', '$location', function ($scope, PlayerFactory, $location){
  	var vm = this;
    vm.playerX = "";
    vm.playerO = "";
  	vm.start = function(){
      PlayerFactory.setPlayersNames(vm.playerX, vm.playerO);
      $location.path("/game");
  	}
  }]);