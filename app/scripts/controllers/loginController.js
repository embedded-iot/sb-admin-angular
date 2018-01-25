'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('LoginCtrl', ['$scope', '$state', 'httpService', '$window', function ($scope ,$state ,httpService,$window) {
    var vm = this;
    vm.UseName =  $window.localStorage['UseName'];
    vm.code = $window.localStorage['code'];
    vm.Model = $window.localStorage['Model'];
    vm.checkLogin = checkLogin;
    function checkLogin() {
      console.log("checkLogin");
      var params = {
        UseName : vm.UseName,
        code : vm.code,
        action : 'isCheckLogin'
      };
      if (vm.Model !== null && vm.Model !== "") {
        params.Model = vm.Model;
      }
      httpService.getData(params).then(function (items) {
        console.log(items);
        if (items.indexOf("true") >=0 ) {
          $window.localStorage['UseName'] = vm.UseName;
          $window.localStorage['code'] = vm.code;
          $window.localStorage['Model'] = vm.Model;
          $state.go('dashboard.home');
        }
      }, function (status) {
        console.log(status);
      });
    };
  }]);