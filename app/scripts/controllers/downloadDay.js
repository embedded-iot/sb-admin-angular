'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('downloadDayCtrl',['$scope','$state','shareData', function($scope,$state,shareData) {
    $scope.monthsOfYear = shareData.monthsOfYear;
    $scope.year = $state.params.year;
    $scope.month = $state.params.month;
    console.log('Year: '+ $state.params.year);
    console.log('Month: '+$state.params.month);

    $scope.days = [
      {index: 0, flagHover : false},
      {index: 1, flagHover : false},
      {index: 2, flagHover : false}
    ];
    $scope.inHover = function (index){
      $scope.days[index].flagHover = true;
      // console.log('in '+index);
    }
    $scope.outHover = function (index){
      $scope.days[index].flagHover = false;
      // console.log('out '+index);
    }
    
}]);