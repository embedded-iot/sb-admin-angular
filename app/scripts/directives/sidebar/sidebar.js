'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
  .directive('sidebar',['$state', '$location','shareData',function($state,shareData) {
    return {
      templateUrl:'scripts/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'dashboard';
        $scope.collapseVar = 0;
        $scope.multiCollapseVar = 0;
        
        $scope.Months = [
          {id : 1 , name : 'January'},
          {id : 2 , name : 'February'},
          {id : 3 , name : 'March'},
          {id : 4 , name : 'April'},
          {id : 5 , name : 'May'},
          {id : 6 , name : 'June'},
          {id : 7 , name : 'July'},
          {id : 8 , name : 'August'},
          {id : 9 , name : 'September'},
          {id : 10 , name : 'October'},
          {id : 11 , name : 'November'},
          {id : 12 , name : 'December'}
        ];

        $scope.check = function(x){
          
          if(x==$scope.collapseVar)
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = x;
        };
        
        $scope.multiCheck = function(y){
          $scope.selectedYear(2017)
          if(y==$scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };
        $scope.selectedMonth = function ($index){
          $state.go('dashboard.downloadDay', { year : 2017 , month : $index})
        }
        $scope.selectedYear = function ($index){
          $state.go('dashboard.downloadMonth', { year : $index})
        }
      }
    }
  }]);
