'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('downloadDayCtrl',['$scope','$state','shareData','$window', 'httpService', function($scope,$state,shareData, $window, httpService) {
    $scope.UseName = $window.localStorage['UseName'];
    $scope.code = $window.localStorage['code'];
    // $scope.monthsOfYear = shareData.monthsOfYear;
    $scope.year = $state.params.year;
    $scope.month = $state.params.month;
    console.log('Year: '+ $scope.year);
    console.log('Month: '+$scope.month);


    $scope.listDayOfMonth = [];
    var getListDays = function () {
      //http://127.0.0.1/projects/PHP/demo3/index.php?UseName=QUAN&code=1234567890&Year=2017&Month=10&action=getDayOfMonth
      var params = {
        UseName : $scope.UseName,
        code : $scope.code,
        Year : $scope.year,
        Month : $scope.month,
        action : 'getDayOfMonth'
      };
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
      $state.go('dashboard.downloadMonth', { year : $scope.year});
    };
    $scope.days = [
      {index: 0, flagHover : false},
      {index: 1, flagHover : false},
      {index: 2, flagHover : false}
    ];
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
      var params = "?UseName=" +$scope.UseName + "&code=" + $scope.code+"&Year=" + $scope.year+ "&Month="+$scope.month+"&Day="+$scope.listDayOfMonth[index].name+"&action=downloadDayOfMonth";
      httpService.newTabBrowser(params);
    };
    
}]);