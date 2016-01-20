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
  		1: {
	  		name: "Gargaroz",
	  		sign: "X",
  		},
  		2: {
	  		name: "Mister E",
	  		sign: "O",
  		}
  	};
  	return {
  		setSign: function(iSign){
  			console.info("iSign = ", iSign);
  			if (iSign != 'X' && iSign != 'O' ) return false;
  			playersSettings.sign = iSign;
  			return true;
  		},
  		getSign: function(){
  			return playersSettings.sign;
  		},
  		getName: function(player){
  			return playersSettings[player].name;
  		}
  	}

  }]);
