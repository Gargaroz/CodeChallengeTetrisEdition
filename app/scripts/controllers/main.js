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
      PlayerFactory.setName("X", vm.playerX);
      PlayerFactory.setName("O", vm.playerO);
      $location.path("/game");
  	}
  }])
  .factory('PlayerFactory', [function(){
  	var playersSettings = {
  		X: {
	  		name: "Gargaroz",
        combosLeft: [
          ["00","01","02"],
          ["10","11","12"],
          ["20","21","22"],
          ["00","10","20"],
          ["01","11","21"],
          ["02","12","22"],
          ["00","11","22"],
          ["02","11","20"]
        ],
        ownedCells: []
  		},
  		O: {
	  		name: "Mister E",
        combosLeft: [
          ["00","01","02"],
          ["10","11","12"],
          ["20","21","22"],
          ["00","10","20"],
          ["01","11","21"],
          ["02","12","22"],
          ["00","11","22"],
          ["02","11","20"]
        ],
        ownedCells: []
  		}
  	};
    var recursiveComboRemoval = function (cell, player){
      playersSettings[player].combosLeft.forEach(function (singleCombo){
        if (singleCombo.indexOf(cell) != -1) {
          var comboToRemove = playersSettings[player].combosLeft.indexOf(singleCombo);
          playersSettings[player].combosLeft.splice(comboToRemove, 1);
          recursiveComboRemoval(cell, player);
        }
      });
    };
    var addToOwned = function(cell, player){
      playersSettings[player].ownedCells.push(cell);
    }
    return {
      setName: function(player, name){
        playersSettings[player].name = name;
      },
      getName: function(player){
        return playersSettings[player].name;
      },
      resetCombosAndCells: function(){
        console.log("playersSettings = ", playersSettings);
        angular.forEach(playersSettings, function(player){
          player.combosLeft = [
            ["00","01","02"],
            ["10","11","12"],
            ["20","21","22"],
            ["00","10","20"],
            ["01","11","21"],
            ["02","12","22"],
            ["00","11","22"],
            ["02","11","20"]
          ];
          player.ownedCells = [];
        });
      },
      checkWinningCombo: function(cell, player){
        addToOwned(cell, player);
        var result = -1;
        if (playersSettings[player].ownedCells.length < 3) return -1;
        playersSettings[player].combosLeft.forEach(function(singleCombo){
          var winningCellsCount = 0;
          singleCombo.forEach(function(singleComboCell){
            if (playersSettings[player].ownedCells.indexOf(singleComboCell) == -1) {return;}
            else {
              winningCellsCount+=1;
            }
            if (winningCellsCount == 3){
              result = singleCombo;
            }
          });
        });
        return result;
      },
      removeCombosContaining: function(cell, player){
        recursiveComboRemoval(cell, player);
      }
  	}
  }]);