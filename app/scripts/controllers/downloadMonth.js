'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('downloadMonthCtrl',['$scope','$state','shareData', function($scope,$state,shareData) {
    $scope.monthsOfYear = shareData.monthsOfYear;
    $scope.year =  $state.params.year;
    console.log(shareData.monthsOfYear[0].name);
    console.log('Year: '+ $state.params.year);
    $scope.months = [
      {index: 0, flagHover : false},
      {index: 1, flagHover : false},
      {index: 2, flagHover : false},
      {index: 3, flagHover : false},
      {index: 4, flagHover : false},
      {index: 5, flagHover : false},
      {index: 6, flagHover : false},
      {index: 7, flagHover : false},
      {index: 8, flagHover : false},
      {index: 9, flagHover : false},
      {index: 10, flagHover : false}
    ];

    $scope.inHover = function (index){
      $scope.months[index].flagHover = true;
      // console.log('in '+index);
    }
    $scope.outHover = function (index){
      $scope.months[index].flagHover = false;
      // console.log('out '+index);
    }
    $scope.selectedMonth = function ($index){
      $state.go('dashboard.downloadDay', { year : 2017 , month : $index})
    }
}]);