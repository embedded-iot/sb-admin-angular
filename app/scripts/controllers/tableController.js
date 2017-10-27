'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp',["ngTable"])
  .controller('ngTableCtrl', ['$scope', 'NgTableParams','$window', 'httpService', '$state', function ($scope, NgTableParams, $window, httpService, $state) {
    $scope.UseName = $window.localStorage['UseName'];
    $scope.code = $window.localStorage['code'];
    console.log('Year: '+ $scope.UseName);
    console.log('Month: '+$scope.code);



    var vm = this;
    var dateNow = new Date();
    vm.data = [];
    vm.oDate2 = dateNow;

    //$window.lolStorage.setItem("getDate",dateNow) ;ca

    // vm.getDate = localStorage['getDate'];
    if ($window.localStorage["getDate"] === undefined){
      vm.SelectDate = new Date();

    }
    else {
      vm.SelectDate= new Date(Date.parse($window.localStorage.getItem("getDate")));
    }

    console.log(vm.SelectDate);
    var data = [
      // {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-10-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-10-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-10-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      // {Date: "12-10-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 }
    ];
    var getDateNow = function () {
      $scope.year = vm.SelectDate.getFullYear();
      $scope.month = vm.SelectDate.getMonth()+1;
      $scope.day = vm.SelectDate.getDate();
    };


    var getDataAPI = function () {
      //http://127.0.0.1/projects/PHP/demo3/index.php?UseName=Q&code=123&Year=2017&Month=10&Day=17&action=getDataOfFile
      var params = {
        UseName : $scope.UseName,
        code : $scope.code,
        Year : $scope.year ,
        Month : ($scope.month < 10 ? ('0'+$scope.month) : $scope.month),
        Day : ($scope.day < 10 ? ('0'+$scope.day) : $scope.day),
        action : 'getDataOfFile'
      };
      httpService.getData(params).then(function (items) {
        if (items.length > 0){
          data = [];
          angular.copy(items, data);
          // console.log('Lenght = '+vm.data.length);
          // console.log(vm.data);
          // vm.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: vm.data});

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
        vm.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: data});
        console.log(data);
      }, function (status) {
        console.log(status);
      });
    };

    vm.onGetDataTable = function () {
      console.log('onGetDataTable');
      // getDateNow();
      // getDataAPI();
      // $state.go('dashboard.table');
      $window.localStorage.setItem("getDate",vm.SelectDate) ;
      $state.reload();
    };

    getDateNow();
    getDataAPI();


}]);