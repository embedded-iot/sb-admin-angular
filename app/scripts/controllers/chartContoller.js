'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('ChartCtrl', ['$scope', '$timeout','$window', 'httpService', '$state', function ($scope, $timeout, $window, httpService, $state) {
  $scope.UseName = $window.localStorage['UseName'];
  $scope.code = $window.localStorage['code'];

   /* $scope.line = {
	    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	    series: ['Series A', 'Series B'],
	    data: [
	      [65, 59, 80, 81, 56, 55, 40],
	      [28, 48, 40, 19, 86, 27, 90]
	    ],
	    onClick: function (points, evt) {
	      console.log(points, evt);
	    }
    };*/

  var vm = this;
  var dateNow = new Date();
  vm.data = [];
  vm.oDate2 = dateNow;

  if ($window.localStorage["getDateChart"] === undefined){
    vm.SelectDate = new Date();
  }
  else {
    vm.SelectDate= new Date(Date.parse($window.localStorage.getItem("getDateChart")));
  }

  console.log(vm.SelectDate);

  var getDateNow = function () {
    $scope.year = vm.SelectDate.getFullYear();
    $scope.month = vm.SelectDate.getMonth()+1;
    $scope.day = vm.SelectDate.getDate();
  };

//"Time":"02-05-40","Temperature":"20.15","Radiant":"30.15"



  var getDataAPI = function () {
    //http://127.0.0.1/projects/PHP/demo3/index.php?UseName=Q&code=123&Year=2017&Month=10&Day=17&action=getDataOfFile
    var params = {
      UseName : $scope.UseName,
      code : $scope.code,
      Year : $scope.year ,
      Month : ($scope.month < 10 ? ('0'+$scope.month) : $scope.month),
      Day : ($scope.day < 10 ? ('0'+$scope.day) : $scope.day),
      action : 'getDataOfFile'
    };
    httpService.getData(params).then(function (items) {

      vm.listTime = [];
      vm.listTemperature = [];
      vm.listRadiant = [];
      if (items.length > 0){
        // console.log('Lenght = '+vm.data.length);
        // console.log(vm.data);
        // vm.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: vm.data});
      	for (var index = 0 ; index < items.length; index ++){
          vm.listTime.push(items[index].Time);
          vm.listTemperature.push(parseFloat(items[index].Temperature));
          vm.listRadiant.push(parseFloat(items[index].Radiant));
				}
				console.log(vm.listTime);
				console.log(vm.listTemperature);
				console.log(vm.listRadiant);
        console.log("End get data");
      }

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

      // console.log(data);
      // if (items.length > 0) {
      //   for (var index =0 ; index < items.length ; index ++){
      //     $scope.listDayOfMonth.push({name: items[index] , flagHover: false})
      //   }
      // }
      // var temp = [];
      // temp = angular.fromJson(items);
      // console.log(temp);
    }, function (status) {
      console.log(status);
    });




  };



  vm.chartOptions = {};
  vm.onGetDataTable = function () {
    console.log('onGetDataTable');
    console.log(vm.SelectDate);
    getDateNow();
    getDataAPI();

    $window.localStorage.setItem("getDateChart",vm.SelectDate) ;
    // $state.go('dashboard.table');
    //$state.reload();

  };

  getDateNow();
  getDataAPI();
  // Highcharts.chart('container',  vm.chartOptions);
 /* vm.chartOptions = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Monthly Average Temperature'
    },
    subtitle: {
      text: 'Source: WorldClimate.com'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      title: {
        text: 'Temperature'
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
      name: 'Tokyo',
      marker: {
        symbol: 'square'
      },
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
        y: 26.5,
        marker: {
          symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
        }
      }, 23.3, 18.3, 13.9, 9.6]

    }, {
      name: 'London',
      marker: {
        symbol: 'diamond'
      },
      data: [{
        y: 3.9,
        marker: {
          symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
        }
      }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8,4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8 ,4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8,4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
  };*/
	// Sample data for pie chart
    /*$scope.bar = {
	    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
		series: ['Series A', 'Series B'],

		data: [
		   [65, 59, 80, 81, 56, 55, 40],
		   [28, 48, 40, 19, 86, 27, 90]
		]

    };

    $scope.donut = {
    	labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
    	data: [300, 500, 100]
    };

    $scope.radar = {
    	labels:["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],

    	data:[
    	    [65, 59, 90, 81, 56, 55, 40],
    	    [28, 48, 40, 19, 96, 27, 100]
    	]
    };

    $scope.pie = {
    	labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
    	data : [300, 500, 100]
    };

    $scope.polar = {
    	labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
    	data : [300, 500, 100, 40, 120]
    };

    $scope.dynamic = {
    	labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
    	data : [300, 500, 100, 40, 120],
    	type : 'PolarArea',

    	toggle : function ()
    	{
    		this.type = this.type === 'PolarArea' ?
    	    'Pie' : 'PolarArea';
		}
    };*/
}]);