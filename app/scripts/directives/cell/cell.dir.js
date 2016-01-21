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
        vm.id = $scope.row.toString() + $scope.column.toString();
        vm.renderSign = function (sign){
          if (vm.sign==""){
            vm.sign = GameFactory.getTurn(vm.id);
            var result = GameFactory.calculateWinner(vm.id);
            if (result != -1) $scope.$emit("thisPlayerWon", result);
          }
        };
      }],
      link: function (scope, elem, attr){

      }
    }
 }]);