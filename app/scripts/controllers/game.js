'use strict';

/**
 * @ngdoc function
 * @name codeChallengeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the codeChallengeApp
 */
angular.module('codeChallengeApp')
  .controller('GameCtrl', ['$scope', 'GameFactory', 'PlayerFactory', '$location', '$timeout', '$window', function ($scope, GameFactory, PlayerFactory, $location, $timeout, $window) {
  	var vm = this;
    vm.actualTurn = GameFactory.getTurn();
    vm.githubIcon = "github-box";
    vm.goToGit = function(){
      vm.githubIcon = (vm.githubIcon == "github-box" ? "github-circle" : "github-box");
      $timeout(function(){
        $window.open("https://github.com/Gargaroz/CodeChallengeTrisEdition", "_blank");
      }, 500);
    };
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
    var newTurnReset = function(){
      vm.playerOneUI.iconSize = (vm.actualTurn == "X" ? 28 : 20);
      vm.playerOneUI.textSize = (vm.actualTurn == "X" ? "h2" : "h3");
      vm.playerOneUI.label = (vm.actualTurn == "X" ? "label-warning" : "label-default");
      vm.playerTwoUI.iconSize = (vm.actualTurn == "O" ? 28 : 20);
      vm.playerTwoUI.textSize = (vm.actualTurn == "O" ? "h2" : "h3");
      vm.playerTwoUI.label = (vm.actualTurn == "O" ? "label-warning" : "label-default");
    };
    vm.resetGrid = function(){
      vm.btnUI.replayIcon = (vm.btnUI.replayIcon == "replay" ? "refresh" : "replay");
      $scope.$broadcast("resetGrid");
      GameFactory.resetGame();
      newTurnReset();
      vm.playerOneUI.icon = "close";
      vm.playerTwoUI.icon = "panorama_fisheye";
    };
    vm.exit = function(){
      vm.btnUI.exitIcon = "arrow_forward";
      $timeout(function(){
        $location.path("/");
      }, 500);
    };
    $scope.$on("turnChanged", function(turnChangedEvent){
      newTurnReset();
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
    });
 }]);