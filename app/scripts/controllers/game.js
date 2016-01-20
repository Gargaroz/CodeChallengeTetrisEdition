'use strict';

/**
 * @ngdoc function
 * @name codeChallengeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the codeChallengeApp
 */
angular.module('codeChallengeApp')
  .controller('GameCtrl', ['$scope', 'PlayerFactory', function ($scope, PlayerFactory) {
  	var vm = this;
  	vm.playerName = PlayerFactory.getName();
  	vm.playerSign = PlayerFactory.getSign();
 }])
  .factory('GameFactory', [function(){
  	var gameSettings = {
  		turn: "X",
  		spacesLeft: 9
  	};
  	return {
  		getTurn: function(){
  			return gameSettings.turn;
  		},
  		getSpacesLeft: function(){
  			return gameSettings.spacesLeft;
  		}
  	}
 }]);