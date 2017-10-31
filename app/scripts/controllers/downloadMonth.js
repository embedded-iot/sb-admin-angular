'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('downloadMonthCtrl',['$scope', '$state', 'shareData', 'httpService', '$window', function($scope, $state, shareData, httpService, $window) {

    $scope.UseName = $window.localStorage['UseName'];
    $scope.code = $window.localStorage['code'];
    $scope.selectedYear = $state.params.year;
    console.log('Year: '+ $scope.selectedYear);

    $scope.listMonthOfYear = [];
    var getListYear = function () {
      //http://127.0.0.1/projects/PHP/demo3/index.php?UseName=QUAN&code=1234567890&action=getYearOfUser
      var params = {
        UseName : $scope.UseName,
        code : $scope.code,
        Year : $scope.selectedYear,
        action : 'getMonthOfYear'
      };
      httpService.getData(params).then(function (items) {
        //angular.copy(items, $scope.listMonthOfYear);
        if (items.length > 0) {
          for (var index =0 ; index < items.length ; index ++){
            $scope.listMonthOfYear.push({name: items[index] , flagHover: false})
          }
        }
      }, function (status) {
        console.log(status);
      });
    };
    getListYear();

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
      $scope.listMonthOfYear[index].flagHover = true;
      // console.log('in '+index);
    }
    $scope.outHover = function (index){
      $scope.listMonthOfYear[index].flagHover = false;
      // console.log('out '+index);
    }
    $scope.selectedMonth = function (index){
      $state.go('dashboard.downloadDay', { year : $scope.selectedYear , month : $scope.listMonthOfYear[index].name})
    }
    //http://127.0.0.1/projects/PHP/demo3/index.php?Month=10&UseName=Q&Year=2017&action=downloadMonthOfYear&code=123
    $scope.downloadMonthOfYear = function (index) {
      //http://127.0.0.1/projects/PHP/demo3/index.php?Day=29&Month=10&UseName=Q&Year=2017&action=downloadMonthOfYear&code=123

      var params = "?UseName=" +$scope.UseName + "&code=" + $scope.code+"&Year=" + $scope.selectedYear+ "&Month="+$scope.listMonthOfYear[index].name+"&action=downloadMonthOfYear";
      httpService.newTabBrowser(params);
    };
}]);