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
				controller: ['$scope','shareData','$window', function ($scope, shareData, $window) {
          // $scope.UseName = shareData.getUseName();
          // $scope.code = shareData.getcode();
          $scope.UseName = $window.localStorage['UseName'];
          $scope.code = $window.localStorage['code'];

				}]
    	};
	}]);


