angular.module('codeChallengeApp')
.directive('cell', [function(){
    return {
      templateUrl: 'scripts/directives/cell/cell.tmpl.html',
      restrict: 'E',
      scope: {
        row: '=',
        column: '='
      },
      controllerAs: 'cellctrl',
      controller: ['$scope', 'GameFactory', function ($scope, GameFactory){
        var vm = this;
        vm.sign = "";
        vm.writeSign = function (sign){
          if (vm.sign==""){
            vm.sign = GameFactory.getTurn();
            GameFactory.changeTurn();
          }
        };
      }],
      link: function (scope, elem, attr){

      }
    }
 }]);