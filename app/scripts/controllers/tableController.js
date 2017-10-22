'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp',["ngTable"])
  .controller('ngTableCtrl', ['$scope', 'NgTableParams','$window', 'httpService', function ($scope, NgTableParams, $window, httpService) {
    $scope.UseName = $window.localStorage['UseName'];
    $scope.code = $window.localStorage['code'];
    console.log('Year: '+ $scope.UseName);
    console.log('Month: '+$scope.code);


    var vm = this;
    var dateNow = new Date();
    vm.data = [];
    vm.oDate2 = dateNow;
    var getDateNow = function () {
      $scope.year = vm.oDate2.getFullYear();
      $scope.month = vm.oDate2.getMonth()+1;
      $scope.day = vm.oDate2.getDate();
    };


    var getDataAPI = function () {
      //http://127.0.0.1/projects/PHP/demo3/index.php?UseName=Q&code=123&Year=2017&Month=10&Day=17&action=getDataOfFile
      var params = {
        UseName : $scope.UseName,
        code : $scope.code,
        Year : $scope.year ,
        Month : ($scope.month < 10 ? '0'.$scope.month : $scope.month),
        Day : ($scope.day < 10 ? '0'.$scope.day : $scope.day),
        action : 'getDataOfFile'
      };
      httpService.getData(params).then(function (items) {
        if (items.length > 0){
          vm.data = [];
          angular.copy(items, vm.data);
          console.log('Lenght = '+vm.data.length);
          console.log(vm.data);
          vm.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: vm.data});
        }
        // console.log(data);
        // if (items.length > 0) {
        //   for (var index =0 ; index < items.length ; index ++){
        //     $scope.listDayOfMonth.push({name: items[index] , flagHover: false})
        //   }
        // }
        // var temp = [];
        // temp = angular.fromJson(items);
        // console.log(temp);
      }, function (status) {
        console.log(status);
      });
    };

    vm.onGetDataTable = function () {
      console.log('onGetDataTable');
      getDateNow();
      getDataAPI();
    };

    getDateNow();
    getDataAPI();

    vm.data1 = [
      {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-10-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-10-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-10-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-10-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 }
    ];



}]);