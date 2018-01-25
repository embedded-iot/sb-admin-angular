'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('downloadMonthCtrl',['$scope', 'httpService', '$window' ,'$state', function($scope, httpService, $window, $state) {

    $scope.UseName = $window.localStorage['UseName'];
    $scope.code = $window.localStorage['code'];
    $scope.Model = $window.localStorage['Model'];

    if ($window.localStorage["downloadYear"] === undefined){
      $scope.selectedYear = (new Date()).getFullYear();
    }
    else {
      $scope.selectedYear = $window.localStorage['downloadYear'] ;
    }
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
      if ($scope.Model !== null && $scope.Model !== "") {
        params.Model = $scope.Model;
      }
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
    $scope.backYearOfUse = function () {
      $state.go('dashboard.downloadYear');
    };
    $scope.inHover = function (index){
      $scope.listMonthOfYear[index].flagHover = true;
      // console.log('in '+index);
    };
    $scope.outHover = function (index){
      $scope.listMonthOfYear[index].flagHover = false;
      // console.log('out '+index);
    };
    $scope.selectedMonth = function (index){
      $window.localStorage["downloadMonth"] = $scope.listMonthOfYear[index].name;
      $state.go('dashboard.downloadDay');
    };

    //http://127.0.0.1/projects/PHP/demo3/index.php?Month=10&UseName=Q&Year=2017&action=downloadMonthOfYear&code=123
    $scope.downloadMonthOfYear = function (index) {
      //http://127.0.0.1/projects/PHP/demo3/index.php?Day=29&Month=10&UseName=Q&Year=2017&action=downloadMonthOfYear&code=123
      var params = "UseName=" +$scope.UseName + "&code=" + $scope.code+"&Year=" + $scope.selectedYear+ "&Month="+$scope.listMonthOfYear[index].name+"&action=downloadMonthOfYear";
      if ($scope.Model !== null && $scope.Model !== "") {
        params += "&Model=" + $scope.Model;
      }
      httpService.newTabBrowser(params);
    };
}]);