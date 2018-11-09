'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
  .directive('googleMaps',function() {
    return {
      restrict: 'E',
      templateUrl:'scripts/directives/google-maps/google-maps.html',
      replace: true,
      scope: {
      },
      controller: ['$scope', '$position','$timeout' ,'httpService' ,'$window',function($scope, $position,$timeout, httpService ,$window ) {
        var vm = this;
        vm.UseName = $window.localStorage['UseName'];
        vm.code = $window.localStorage['code'];
        vm.Model = $window.localStorage['Model'];

        vm.infoAccount = {};
        vm.httpService = httpService;
        var getInforAccount = function () {
          //http://127.0.0.1/projects/PHP/demo3/index.php?UseName=QUAN&code=1234567890&action=getInforAccount
          var params = {
            UseName : vm.UseName,
            code : vm.code,
            action : 'getInforAccount'
          };
          if (vm.Model !== null && vm.Model !== "") {
            params.Model = vm.Model;
          }
          vm.httpService.getData(params).then(function (items) {
            if (items !== null) {
              angular.copy(items, vm.infoAccount);
              console.log(items);
            }

            //scope.$apply();
            //$window.location.reload();
            //$state.reload();
          }, function (status) {
            console.log(status);
          });
        };
        vm.SelectDate = new Date();
        console.log(vm.SelectDate);

        var getDateNow = function () {
          $scope.year = vm.SelectDate.getFullYear();
          $scope.month = vm.SelectDate.getMonth()+1;
          $scope.day = vm.SelectDate.getDate();
          vm.DateNow = $scope.day+'-'+$scope.month + '-'+$scope.year;
        };
        $scope.infoAccount;
        vm.chartOptions = {};
        vm.data = [];

        var getCurrentData = function () {
          //http://127.0.0.1/projects/PHP/demo3/index.php?UseName=Q&code=123&Year=2017&Month=10&Day=17&action=getDataOfFile
          var params = {
            UseName : vm.UseName,
            code : vm.code,
            Year : $scope.year ,
            Month : ($scope.month < 10 ? ('0'+$scope.month) : $scope.month),
            Day : ($scope.day < 10 ? ('0'+$scope.day) : $scope.day),
            action : 'getCurrentData'
          };
          if (vm.Model !== null && vm.Model !== "") {
            params.Model = vm.Model;
          }
          vm.httpService.getData(params).then(function (items) {
            if (items !== null) {
              console.log(items);
              createMarker(vm.infoAccount, items);
            }
          }, function (status) {
            console.log(status);
          });
        };
        getDateNow();
        getInforAccount();

        var mapOptions = {
          zoom: 4,
          center: new google.maps.LatLng(25,80),
          mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        $scope.markers = [];

        var infoWindow = new google.maps.InfoWindow();
        var listen = $scope.$watch(function () {
          $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
          return $scope.map;
        }, function (oldValue, newValue) {
          if (newValue !== undefined && newValue !== null && newValue !== oldValue) {
            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
            console.log($scope.map);
           /* $scope.Timer = setInterval(function () {
              $scope.$apply(function () {
                getCurrentData();
              });
            }, 8000);*/

            listen();
          }
        });

        var createMarker = function (info, data){

          var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.UseName + "<br>"+ info.code
          });
          //marker.content = '<div class="infoWindowContent">' + info.code + '</div>';
          //{"Date":"7-12-2017","Time":"0-14-2","Temperature":"22.60","Radiant":"-1.29",
          if (data !== undefined && data !== null && data.Date !== undefined){
            marker.content = '<div class="infoWindowContent">'
            angular.forEach(data, function(value, key) {
              console.log(key + ': ' + value);
              marker.content += key + ':' + value +'<br>';
            });
            marker.content += '</div>';
          }
          else marker.content = '<div class="infoWindowContent">No Data</div>';
          google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h4>' + marker.title + '</h4>' + marker.content);
            infoWindow.open($scope.map, marker);
          });
          $scope.markers = [];
          $scope.markers.push(marker);

          $scope.openInfoWindow(marker);
        };


        $scope.openInfoWindow = function(selectedMarker){
          console.log("selectedMarker");
          //e.preventDefault();
          google.maps.event.trigger(selectedMarker, 'click');
        };


        $scope.$on("$destroy",function(){
          console.log("destroy google maps");
          clearInterval($scope.Timer)
        });
      }]
    };
  });


