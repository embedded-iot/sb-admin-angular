'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('downloadDayCtrl',['$scope','$state','$window', 'httpService', function($scope,$state, $window, httpService) {
    $scope.UseName = $window.localStorage['UseName'];
    $scope.code = $window.localStorage['code'];
    $scope.Model = $window.localStorage['Model'];
    // $scope.monthsOfYear = shareData.monthsOfYear;

    if ($window.localStorage["downloadYear"] === undefined){
      $scope.selectedYear = (new Date()).getFullYear();
    }
    else {
      $scope.selectedYear = $window.localStorage['downloadYear'] ;
    }
    if ($window.localStorage["downloadMonth"] === undefined){
      $scope.selectedMonth = (new Date()).getMonth()+1;
    }
    else {
      $scope.selectedMonth = $window.localStorage['downloadMonth'] ;
    }
    console.log('Year: '+ $scope.selectedYear);
    console.log('Month: '+$scope.selectedMonth);

    $scope.listDayOfMonth = [];
    var getListDays = function () {
      //http://127.0.0.1/projects/PHP/demo3/index.php?UseName=QUAN&code=1234567890&Year=2017&Month=10&action=getDayOfMonth
      var params = {
        UseName : $scope.UseName,
        code : $scope.code,
        Year : $scope.selectedYear,
        Month : $scope.selectedMonth,
        action : 'getDayOfMonth'
      };
      if ($scope.Model !== null && $scope.Model !== "") {
        params.Model = $scope.Model;
      }
      httpService.getData(params).then(function (items) {
        //angular.copy(items, $scope.listMonthOfYear);
        if (items.length > 0) {
          for (var index =0 ; index < items.length ; index ++){
            $scope.listDayOfMonth.push({name: items[index] , flagHover: false})
          }
        }
      }, function (status) {
        console.log(status);
      });
    };
    getListDays();
    $scope.backMonthOfYear = function () {
      $state.go('dashboard.downloadMonth');
    };
    $scope.inHover = function (index){
      $scope.listDayOfMonth[index].flagHover = true;
      // console.log('in '+index);
    };
    $scope.outHover = function (index){
      $scope.listDayOfMonth[index].flagHover = false;
      // console.log('out '+index);
    };
    
    $scope.downloadDayOfMonth = function (index) {
      //http://127.0.0.1/projects/PHP/demo3/index.php?Day=29&Month=10&UseName=Q&Year=2017&action=downloadDayOfMonth&code=123
      var params = {
        UseName : $scope.UseName,
        code : $scope.code,
        Year : $scope.year,
        Month : $scope.month,
        Day :  $scope.listDayOfMonth[index].name,
        action : 'downloadDayOfMonth'
      };
      var params = "UseName=" +$scope.UseName + "&code=" + $scope.code+"&Year=" + $scope.selectedYear+ "&Month="+$scope.selectedMonth+"&Day="+$scope.listDayOfMonth[index].name+"&action=downloadDayOfMonth";
      if ($scope.Model !== null && $scope.Model !== "") {
        params += "&Model=" + $scope.Model;
      }
      httpService.newTabBrowser(params);
    };
    
}]);