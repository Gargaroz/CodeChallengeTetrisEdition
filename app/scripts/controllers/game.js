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
    vm.pOneName = PlayerFactory.getName("X");
    vm.pTwoName = PlayerFactory.getName("O");
    $scope.$on("thisPlayerWon", function(winningCombo){
      alert("Player " + vm.actualTurn + " Wins with combo: ", winningCombo.join(", "));
    });
 }])
  .factory('GameFactory', ['$rootScope', 'PlayerFactory', function ($rootScope, PlayerFactory){
  	var gameSettings = {
  		turn: "X",
      moves: 0
  	};
    var changeTurn = function(){
      gameSettings.turn = (gameSettings.turn == "X" ? "O" : "X");
    };
  	return {
  		getTurn: function(){
  			return gameSettings.turn;
  		},
      calculateWinner: function(cell){
        var winningCombo = PlayerFactory.checkWinningCombo(cell, gameSettings.turn);
        console.info("winningCombo = ", winningCombo);
        if (winningCombo != -1) {
          return winningCombo;
        } else {
          var opponent = (gameSettings.turn == "X" ? "O" : "X");
          PlayerFactory.removeCombosContaining(cell, opponent);
          changeTurn();
        }
        return -1;
      }
  	}
 }]);