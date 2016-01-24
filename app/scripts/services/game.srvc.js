angular.module('codeChallengeApp')
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
 }])