'use strict';

/**
 * @ngdoc function
 * @name codeChallengeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the codeChallengeApp
 */
angular.module('codeChallengeApp')
  .controller('GameCtrl', ['$scope', 'GameFactory', 'PlayerFactory', '$location', '$timeout', function ($scope, GameFactory, PlayerFactory, $location, $timeout) {
  	var vm = this;
    vm.actualTurn = GameFactory.getTurn();
    vm.status = GameFactory.getStatus();
    vm.iconOpts = {'duration': 420};
    vm.btnUI = {
      replayIcon: "replay",
      exitIcon: "exit_to_app",
    };
    vm.playerOneUI = {
      name: PlayerFactory.getName("X"),
      icon: "close",
      iconColor: "white",
      iconSize: (vm.actualTurn == "X" ? 28 : 20),
      textSize: (vm.actualTurn == "X" ? "h2" : "h3"),
      label: (vm.actualTurn == "X" ? "label-warning" : "label-default")
    };
    vm.playerTwoUI = {
      name: PlayerFactory.getName("O"),
      icon: "panorama_fisheye",
      iconColor: "white",
      iconSize: (vm.actualTurn == "O" ? 28 : 20),
      textSize: (vm.actualTurn == "O" ? "h2" : "h3"),
      label: (vm.actualTurn == "O" ? "label-warning" : "label-default")
    };
    vm.resetGrid = function(){
      vm.btnUI.replayIcon = (vm.btnUI.replayIcon == "replay" ? "refresh" : "replay");
      $scope.$broadcast("resetGrid");
      GameFactory.resetGame();
      vm.actualTurn = GameFactory.getTurn();
      vm.gameStatus = GameFactory.getStatus();
      vm.playerOneUI.icon = "close";
      vm.playerOneUI.iconSize = (vm.actualTurn == "X" ? 28 : 20);
      vm.playerOneUI.textSize = (vm.actualTurn == "X" ? "h2" : "h3");
      vm.playerOneUI.label = (vm.actualTurn == "X" ? "label-warning" : "label-default")
      vm.playerTwoUI.icon = "panorama_fisheye";
      vm.playerTwoUI.iconSize = (vm.actualTurn == "O" ? 28 : 20);
      vm.playerTwoUI.textSize = (vm.actualTurn == "O" ? "h2" : "h3");
      vm.playerTwoUI.label = (vm.actualTurn == "O" ? "label-warning" : "label-default")
    };
    vm.exit = function(){
      vm.btnUI.exitIcon = "arrow_forward";
      $timeout(function(){
        $location.path("/");
      }, 500);
    };
    $scope.$on("turnChanged", function(turnChangedEvent){
      vm.actualTurn = GameFactory.getTurn();
      vm.playerOneUI.iconSize = (vm.actualTurn == "X" ? 28 : 20);
      vm.playerOneUI.textSize = (vm.actualTurn == "X" ? "h2" : "h3");
      vm.playerOneUI.label = (vm.actualTurn == "X" ? "label-warning" : "label-default")
      vm.playerTwoUI.iconSize = (vm.actualTurn == "O" ? 28 : 20);
      vm.playerTwoUI.textSize = (vm.actualTurn == "O" ? "h2" : "h3");
      vm.playerTwoUI.label = (vm.actualTurn == "O" ? "label-warning" : "label-default")
    });
    $scope.$on("thisPlayerWon", function(thisPlayerWonEvent, winningCombo){
      $scope.$broadcast("enlightYourselves", winningCombo);
      if (vm.actualTurn == "X"){
        vm.playerOneUI.icon = "thumb_up";
        vm.playerOneUI.label = "label-success";
        vm.playerTwoUI.icon = "thumb_down";
        vm.playerTwoUI.label = "label-danger";
      } else {
        vm.playerTwoUI.icon = "thumb_up";
        vm.playerTwoUI.label = "label-success";
        vm.playerOneUI.icon = "thumb_down";
        vm.playerOneUI.label = "label-danger";
      }
      vm.gameStatus = GameFactory.getStatus();
    });
 }])
  .factory('GameFactory', ['$rootScope', 'PlayerFactory', function ($rootScope, PlayerFactory){
  	var gameSettings = {
  		turn: "X",
      status: "playing"
  	};
    var changeTurn = function(){
      gameSettings.turn = (gameSettings.turn == "X" ? "O" : "X");
    };
  	return {
  		getTurn: function(){
  			return gameSettings.turn;
  		},
      getStatus: function(){
        return gameSettings.status;
      },
      calculateWinner: function(cell){
        var winningCombo = PlayerFactory.checkWinningCombo(cell, gameSettings.turn);
        if (winningCombo != -1) {
          gameSettings.status = "finished";
          return winningCombo;
        } else {
          var opponent = (gameSettings.turn == "X" ? "O" : "X");
          PlayerFactory.removeCombosContaining(cell, opponent);
          changeTurn();
        }
        return -1;
      },
      resetGame: function(){
        gameSettings.turn = "X";
        gameSettings.status = "playing";
        PlayerFactory.resetCombosAndCells();
      }
  	}
 }]);