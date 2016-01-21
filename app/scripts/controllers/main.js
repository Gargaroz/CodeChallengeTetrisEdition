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
  	vm.playAs = function(uSign){
  		var signSet = PlayerFactory.setSign(uSign);
  		if (signSet) {
  			$location.path("/game");
  		} else {
  			alert("'X' or 'O' only");
  			$location.path("/");
  		}
  	}
  }])
  .factory('PlayerFactory', [function(){
  	var playersSettings = {
  		X: {
	  		name: "Gargaroz",
	  		// sign: "X",
        combosLeft: [
        // orizzontali
          ["00","01","02"],
          ["10","11","12"],
          ["20","21","22"],
        // verticali
          ["00","10","20"],
          ["01","11","21"],
          ["02","12","22"],
        // diagonali
          ["00","11","22"],
          ["02","11","20"]
        ],
        ownedCells: []
  		},
  		O: {
	  		name: "Mister E",
	  		// sign: "O",
        combosLeft: [
        // orizzontali
          ["00","01","02"],
          ["10","11","12"],
          ["20","21","22"],
        // verticali
          ["00","10","20"],
          ["01","11","21"],
          ["02","12","22"],
        // diagonali
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
          console.info("removed combo", singleCombo);
          recursiveComboRemoval(cell, player);
        }
      });
    };
    var addToOwned = function(cell, player){
      playersSettings[player].ownedCells.push(cell);
    }
    return {
      setSign: function(iSign){
        if (iSign != 'X' && iSign != 'O' ) return false;
        playersSettings.sign = iSign;
        return true;
      },
      getSign: function(){
        return playersSettings.sign;
      },
      getName: function(player){
        return playersSettings[player].name;
      },
      checkWinningCombo: function(cell, player){
        addToOwned(cell, player);
        console.log("player " + player + " ownedCells = ", playersSettings[player].ownedCells)
        if (playersSettings[player].ownedCells.length < 3) return -1;
        playersSettings[player].combosLeft.forEach(function(singleCombo){
          singleCombo.forEach(function(singleComboCell){
            if (playersSettings[player].ownedCells.indexOf(singleComboCell) == -1) return -1;
          });
          console.log("we have a winner: ", singleCombo);
          return singleCombo;
        });
      },
      removeCombosContaining: function(cell, player){
        console.error("removing from player " + player + " combos containing cell '" + cell + "'");
        recursiveComboRemoval(cell, player);
        console.warn("player " + player + " has "+ playersSettings[player].combosLeft.length + " combosLeft = ", playersSettings[player].combosLeft);
      }
  	}
  }]);