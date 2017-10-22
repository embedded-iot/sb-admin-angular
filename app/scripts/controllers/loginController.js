'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('LoginCtrl', ['$scope', '$timeout', '$state', 'httpService', 'shareData' , '$window', function ($scope, $timeout ,$state ,httpService, shareData,$window) {
    $scope.UseName = '';
    $scope.code = '';

    $scope.checkLogin = function () {
      var params = {
        UseName : $scope.UseName,
        code : $scope.code,
        action : 'isCheckLogin'
      };
      httpService.getData(params).then(function (items) {
        console.log(items);
        if (items.indexOf("true") >=0 ) {
          shareData.setUseName($scope.UseName);
          shareData.setcode($scope.code);
          $window.localStorage['UseName'] = $scope.UseName;
          $window.localStorage['code'] = $scope.code;
          $state.go('dashboard.home');
        }
      }, function (status) {
        console.log(status);
      });

    };
    $scope.isDisabled = function () {
      return loginForm.invalid;
    };
  }]);