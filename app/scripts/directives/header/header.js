'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('header',function(){
		return {
      	restrict: 'E',
				scope: {},
        templateUrl:'scripts/directives/header/header.html',
        replace: true
    	}
	});


