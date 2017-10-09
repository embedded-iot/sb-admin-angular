'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp',["ngTable"])
  .controller('ngtableCtrl', ['$scope', 'NgTableParams', function ($scope, NgTableParams) {
    var self = this;
    var data = [
      {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-08-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-09-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-10-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-10-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-10-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 },
      {Date: "12-10-2017", Time: "02-05-40", Temperature: 20.15 , Radiant: 30.15 }
    ];
    self.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: data});
}]);