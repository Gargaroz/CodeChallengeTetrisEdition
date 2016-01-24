angular.module('codeChallengeApp')
.directive('cell', [function(){
    return {
      templateUrl: 'scripts/directives/cell/cell.tmpl.html',
      restrict: 'E',
      scope: {
        id: "@"
      },
      controllerAs: 'cellctrl',
      controller: ['$scope', 'GameFactory', function ($scope, GameFactory){
        var vm = this;
        vm.sign = "";
        vm.icon = "crop_square";
        vm.iconOpts = {'duration': 420};
        vm.enlighted = "";
        vm.renderSign = function (sign){
          if (vm.sign=="" && GameFactory.getStatus()=="playing"){
            vm.sign = GameFactory.getTurn($scope.id);
            vm.icon = (vm.sign == "X" ? "close" : "panorama_fisheye")
            var result = GameFactory.calculateWinner($scope.id);
            if (result != -1) $scope.$emit("thisPlayerWon", result);
            else {$scope.$emit("turnChanged");}
          }
        };
      }],
      link: function (scope, elem, attrs, controller){
        scope.$on("enlightYourselves", function(enlightYourselvesEvent, winningCombo){
          if (winningCombo.indexOf(scope.id) != -1) controller.enlighted = {'background': '#dff0d8'};
        });
        scope.$on("resetGrid", function(resetGridEvent){
          controller.sign = ""
          controller.icon = "crop_square";
          controller.enlighted = "";
        });
      }
    }
 }]);