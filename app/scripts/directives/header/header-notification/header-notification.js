'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('headerNotification',['shareData',function(){
		return {
        templateUrl:'scripts/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
				// scope: {
				// 	UseName: '=',
				// 	code : '='
				// },
				controller: ['$scope','shareData','$window','$state', function ($scope, shareData, $window, $state) {
          // $scope.UseName = shareData.getUseName();
          // $scope.code = shareData.getcode();
          $scope.UseName = $window.localStorage['UseName'];
          $scope.code = $window.localStorage['code'];
					$scope.logout = function () {
            $window.localStorage.clear();
            $state.go("login");
          };
				}]
    	};
	}]);


