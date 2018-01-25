'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('downloadYearCtrl',['$scope','httpService', '$window', '$state', '$element', function($scope, httpService, $window , $state, $element) {

    var vm = this;
    vm.UseName = $window.localStorage['UseName'];
    vm.code = $window.localStorage['code'];
    vm.Model = $window.localStorage['Model'];

    vm.listYearOfUse = [];
    vm.httpService = httpService;
    var getListYear = function () {
      //http://127.0.0.1/projects/PHP/demo3/index.php?UseName=QUAN&code=1234567890&action=getYearOfUser
      var params = {
        UseName : vm.UseName,
        code : vm.code,
        action : 'getYearOfUser'
      };
      if (vm.Model !== null && vm.Model !== "") {
        params.Model = vm.Model;
      }
      vm.httpService.getData(params).then(function (items) {
        //angular.copy(items, vm.listYearOfUse);
        if (items.length > 0) {
          for (var index =0 ; index < items.length ; index ++){
            vm.listYearOfUse.push({name: items[index] , flagHover: false})
          }
        }

        //scope.$apply();
        //$window.location.reload();
        //$state.reload();
      }, function (status) {
        console.log(status);
      });
    };
    getListYear();

    vm.inHover = function (index){
      vm.listYearOfUse[index].flagHover = true;
      // console.log('in '+index);
    };
    vm.outHover = function (index){
      vm.listYearOfUse[index].flagHover = false;
      // console.log('out '+index);
    };
    vm.clickYear = function (item){
      console.log(item);
      $window.localStorage['downloadYear'] = item.name;
      $state.go('dashboard.downloadMonth');
    };

    $scope.$on("$destroy",function(){
      console.log("destroy downloadYear");
      $element.remove();
    });

}]);