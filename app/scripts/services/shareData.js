'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
    .factory('shareData',function() {

    var UseName = '';
    var code = '';
    var year= 0;
    var monthsOfYear = [
      {id : '01' , name : 'January'},
      {id : '02' , name : 'February'},
      {id : '03' , name : 'March'},
      {id : '04' , name : 'April'},
      {id : '05' , name : 'May'},
      {id : '06' , name : 'June'},
      {id : '07' , name : 'July'},
      {id : '08' , name : 'August'},
      {id : '09' , name : 'September'},
      {id : '10' , name : 'October'},
      {id : '11' , name : 'November'},
      {id : '12' , name : 'December'}
    ];
    var getUseName = function () {
      console.log(UseName);
      return UseName;
    };
    var setUseName = function (useName) {
      console.log('setUseName' + useName);
      UseName = useName;
    };
    var getcode = function () {
      console.log(code);
      return code;
    };
    var setcode = function (codeDevice) {
      console.log('setcode' + codeDevice);
      code = codeDevice;
    };
    var obj = {
      getUseName : getUseName,
      setUseName : setUseName,
      getcode : getcode,
      setcode : setcode,
      year : year,
      monthsOfYear: monthsOfYear
    };
    return obj;
  });
