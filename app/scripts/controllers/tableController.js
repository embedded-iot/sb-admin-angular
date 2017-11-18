'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ngTableCtrl', ['$scope', 'httpService' ,'$state','$window', function ($scope, httpService, $state ,$window) {
    var vm = this;
    vm.UseName = $window.localStorage['UseName'];
    vm.code = $window.localStorage['code'];

    
    var dateNow = new Date();
    vm.data = [];
    vm.oDate2 = dateNow;
    vm.httpService = httpService;
   /* // vm.getDate = localStorage['getDate'];
    if ($window.localStorage["getDate"] === undefined){
      vm.SelectDate = new Date();
    }
    else {
      vm.SelectDate= new Date(Date.parse($window.localStorage.getItem("getDate")));
    }*/
    vm.SelectDate = new Date();
    console.log(vm.SelectDate);
    vm.data = [];
    var getDateNow = function () {
      vm.year = vm.SelectDate.getFullYear();
      vm.month = vm.SelectDate.getMonth()+1;
      vm.day = vm.SelectDate.getDate();
    };


    var getDataAPI = function () {
      //http://127.0.0.1/projects/PHP/demo3/index.php?UseName=Q&code=123&Year=2017&Month=10&Day=17&action=getDataOfFile
      var params = {
        UseName : vm.UseName,
        code : vm.code,
        Year : vm.year ,
        Month : (vm.month < 10 ? ('0'+vm.month) : vm.month),
        Day : (vm.day < 10 ? ('0'+vm.day) : vm.day),
        action : 'getDataOfFile'
      };
      vm.httpService.getData(params).then(function (items) {

        if (items.length > 0){

          angular.copy(items, vm.data);
        }
        vm.isNoData = vm.data.length;
        console.log(vm.data);
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

    vm.sortType     = 'Date'; // set the default sort type
    vm.sortReverse  = false;  // set the default sort order
    vm.searchKeyword= '';     // set the default search/filter term


}]);