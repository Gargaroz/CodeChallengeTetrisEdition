'use strict';

/**
 * @ngdoc function
 * @name codeChallengeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the codeChallengeApp
 */
angular.module('codeChallengeApp')
  .controller('GameCtrl', ['$scope', 'GameFactory', 'PlayerFactory', function ($scope, GameFactory, PlayerFactory) {
  	var vm = this;
  	vm.actualTurn = GameFactory.getTurn();
    vm.pOneName = PlayerFactory.getName(1);
    vm.pTwoName = PlayerFactory.getName(2);
 }])
  .factory('GameFactory', [function(){
  	var gameSettings = {
  		turn: "X",
  	};
  	return {
  		getTurn: function(){
  			return gameSettings.turn;
  		},
  		getSpacesLeft: function(){
  			return gameSettings.spacesLeft;
  		},
      changeTurn: function(){
        gameSettings.turn = (gameSettings.turn == "X" ? "O" : "X");
      }
  	}
 }]);