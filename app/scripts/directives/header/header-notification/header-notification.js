'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('headerNotification',function(){
		return {
        restrict: 'E',
        replace: true,
      	scope: {},
      	templateUrl:'scripts/directives/header/header-notification/header-notification.html',
				controller: ['$scope','$window','$state', function ($scope, $window, $state) {
					// $scope.UseName = shareData.getUseName();
					// $scope.code = shareData.getcode();
					$scope.UseName = $window.localStorage["UseName"] === undefined ? "No User" : $window.localStorage['UseName'];
					$scope.code =  $window.localStorage["code"] === undefined ? "No code" : $window.localStorage['code'];

				}]
    	}
	});


