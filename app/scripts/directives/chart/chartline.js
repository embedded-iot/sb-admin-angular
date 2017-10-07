 // Directive for generic chart, pass in chart options
 angular.module('sbAdminApp')
 .directive('hcChart', function () {
  return {
      restrict: 'E',
    //   template: '<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>',
      templateUrl: 'scripts/directives/chart/hcChart.html',
      scope: {
          options: '=',
          extendClass : '='
      },
      link: function (scope, element) {
          Highcharts.chart('container', scope.options);
      }
  };
})