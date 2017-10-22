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
      controller: ['$scope','$window', 'httpService',function($scope, $window, httpService ){

        $scope.UseName = $window.localStorage['UseName'];
        $scope.code = $window.localStorage['code'];


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

        $scope.listYear = [];
        $scope.listMonth = [];

        var getListYear = function () {
          //http://127.0.0.1/projects/PHP/demo3/index.php?UseName=QUAN&code=1234567890&action=getYearOfUser
          var params = {
            UseName : $scope.UseName,
            code : $scope.code,
            action : 'getYearOfUser'
          };
          httpService.getData(params).then(function (items) {
            //console.log(items);
            angular.copy(items, $scope.listYear);
            getMonthOfYear();
          }, function (status) {
            console.log(status);
          });
        };
        var index = 0;
        var getMonthOfYear = function () {
          index = 0;
          if ($scope.listYear.length === 0)
            return;
          for (index = 0; index < $scope.listYear.length; index++)
          {
            //http://127.0.0.1/projects/PHP/demo3/index.php?UseName=QUAN&code=1234567890&Year=2017&action=getMonthOfYear
            var params = {
              UseName : $scope.UseName,
              code : $scope.code,
              Year : $scope.listYear[index],
              action : 'getMonthOfYear'
            };
            httpService.getData(params).then(function (items) {
              //console.log(items);
              // $scope.listYear = items;
              // var month = {};
              // angular.copy(items, month);
              $scope.listMonth.push({months : items});
            }, function (status) {
              console.log(status);
            });
          }
          console.log($scope.listMonth);
        };
        getListYear();


        $scope.check = function(x){
          
          if(x==$scope.collapseVar)
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = x;
        };
        
        $scope.multiCheck = function(y, index){

          if(y==$scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
          var selectYear = $scope.listYear[index];
          $scope.selectedYear(selectYear);
        };
        $scope.selectedMonth = function (indexYear, index){
          var selectYear = $scope.listYear[indexYear];
          var selectMonth = $scope.listMonth[indexYear].months[index];
          console.log(selectYear);
          console.log(selectMonth);
          $state.go('dashboard.downloadDay', { year : selectYear , month : selectMonth});
        }
        $scope.selectedYear = function ($index){
          $state.go('dashboard.downloadMonth', { year : $index});
        }
      }]
    }
  }]);
