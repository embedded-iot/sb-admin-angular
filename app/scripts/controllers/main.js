'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp',["ngTable"])
  .controller('MainCtrl',['$scope','$position','$timeout', 'httpService','NgTableParams','$state', '$window', function($scope,$position, $timeout, httpService, NgTableParams, $state, $window) {
    $scope.UseName = $window.localStorage['UseName'];
    $scope.code = $window.localStorage['code'];

    var vm = this;
    vm.SelectDate = new Date();
    console.log(vm.SelectDate);

    var getDateNow = function () {
      $scope.year = vm.SelectDate.getFullYear();
      $scope.month = vm.SelectDate.getMonth()+1;
      $scope.day = vm.SelectDate.getDate();
    };

    vm.chartOptions = {};
    var data = [];
    var getDataAPI = function () {
      //http://127.0.0.1/projects/PHP/demo3/index.php?UseName=Q&code=123&Year=2017&Month=10&Day=17&action=getDataOfFile
      console.log("home getDataAPI");
      var params = {
        UseName : $scope.UseName,
        code : $scope.code,
        Year : $scope.year ,
        Month : ($scope.month < 10 ? ('0'+$scope.month) : $scope.month),
        Day : ($scope.day < 10 ? ('0'+$scope.day) : $scope.day),
        action : 'getDataOfFile'
      };
      httpService.getData(params).then(function (items) {
        console.log("trong ham getDataAPI");
        vm.listTime = [];
        vm.listDate = [];
        vm.listTemperature = [];
        vm.listRadiant = [];
        if (items.length > 0){

          data = [];
          angular.copy(items, data);
          console.log('data = ');
          console.log(data);
          // vm.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: vm.data});
          for (var index = 0 ; index < items.length; index ++){

            vm.listTime.push(items[index].Time);
            vm.listDate.push(items[index].Date);
            vm.listTemperature.push(parseFloat(items[index].Temperature));
            vm.listRadiant.push(parseFloat(items[index].Radiant));
          }
          console.log(vm.listTime);
          console.log(vm.listTemperature);
          console.log(vm.listRadiant);
        }

        vm.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: data});
        console.log(data);

        vm.chartOptions = {
          chart: {
            type: 'spline'
          },
          title: {
            text: 'Days Average Temperature And Radiant'
          },
          subtitle: {
            text: 'Source: Mbell.vn'
          },
          xAxis: {
            categories: vm.listTime
          },
          yAxis: {
            title: {
              text: 'Temperature And Radiant'
            },
            labels: {
              formatter: function () {
                return this.value + '°';
              }
            }
          },
          tooltip: {
            crosshairs: true,
            shared: true
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: [{
            name: 'Temperature',
            marker: {
              symbol: 'square'
            },
            data: vm.listTemperature

          }, {
            name: 'Radiant',
            marker: {
              symbol: 'diamond'
            },
            data: vm.listRadiant
          }]
        };
        Highcharts.chart('container',  vm.chartOptions);

      }, function (status) {
        console.log(status);
      });
    };
    getDateNow();
    getDataAPI();
    /*var myVar = setInterval(myTimer, 1000);
    function myTimer() {

      //$state.reload();
      $state.go($state.current, {}, {reload: true});
    }*/


  }]);
