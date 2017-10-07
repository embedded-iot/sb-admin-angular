'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ChartCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.line = {
	    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	    series: ['Series A', 'Series B'],
	    data: [
	      [65, 59, 80, 81, 56, 55, 40],
	      [28, 48, 40, 19, 86, 27, 90]
	    ],
	    onClick: function (points, evt) {
	      console.log(points, evt);
	    }
    };

		
		$scope.chartOptions = {
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
					}, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
			}]
	};
	

	// Sample data for pie chart
    $scope.bar = {
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
    };
}]);