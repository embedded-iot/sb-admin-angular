'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
  .factory('httpService',function($http, $q) {

    var URL_SERVER = 'http://127.0.0.1/projects/PHP/demo3/index.php';
    // var all, odds = [];
    // var getData = function() {
    //   return $http.get("http://www.w3schools.com/angular/customers.php")
    //     .then(function(response) {
    //       return response.data;
    //     });
    // }
    // return {
    //   getData: getData
    // };
    return {
      getData: function (params) {
        var deferred = $q.defer();
        $http(
          {
            method: "GET",
            url: URL_SERVER,
            params : params,
            headers : {
              'Access-Control-Allow-Origin': '*'
            }
          })
          .success(function (data, status, headers, config) {
            deferred.resolve(data);
          }).error(function (data, status, headers, config) {
          deferred.reject(status);
        });
        return deferred.promise;
      },
      newTabBrowser: function (params) {
        var url = URL_SERVER + params;
        window.open(url, "_blank");
      }

    }
  });
