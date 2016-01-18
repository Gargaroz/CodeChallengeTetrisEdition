'use strict';

/**
 * @ngdoc function
 * @name codeChallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the codeChallengeApp
 */
angular.module('codeChallengeApp')
  .controller('MainCtrl', ['$scope', 'PlayerService', '$location', function ($scope, PlayerService, $location){
  	var vm = this;
  	vm.playAs = function(uSign){
  		var signSet = PlayerService.setSign(uSign);
  		console.info("uSign = ", uSign);
  		if (signSet) {
  			$location.path("/game");
  		} else {
  			alert("'X' or 'O' only");
  			$location.path("/");
  		}
  	}
  }])
  .factory('PlayerService', [function(){
  	var playerSettings = {
  		name: "Gargaroz",
  		sign: "X"
  	};
  	return {
  		setSign: function(iSign){
  			console.info("iSign = ", iSign);
  			if (iSign != 'X' && iSign != 'O' ) return false;
  			playerSettings.sign = iSign;
  			return true;
  		},
  		getSign: function(){
  			return playerSettings.sign;
  		},
  		getName: function(){
  			return playerSettings.name;
  		}
  	}

  }]);
