'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('googleMapsCtrl', ['$scope', '$position','$timeout' ,'httpService' ,'$window',function($scope, $position,$timeout, httpService ,$window ) {
    var vm = this;
    vm.UseName = $window.localStorage['UseName'];
    vm.code = $window.localStorage['code'];
    vm.infoAccount = {};
    vm.httpService = httpService;
    var getInforAccount = function () {
      //http://127.0.0.1/projects/PHP/demo3/index.php?UseName=QUAN&code=1234567890&action=getInforAccount
      var params = {
        UseName : vm.UseName,
        code : vm.code,
        action : 'getInforAccount'
      };
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

    /*$scope.markerLat = 23.200000;
    $scope.markerLng = 79.225487;
    $scope.infoTitle = 'India';

    var india = new google.maps.LatLng($scope.markerLat, $scope.markerLng);

    var mapOptions = {
      zoom : 4,
      center : india,
      mapTypeId : google.maps.MapTypeId.TERRAIN
    };

    $scope.map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    $scope.addMarker = function(lat, lng, title) {

      var latLang = new google.maps.LatLng(lat, lng);

      var marker = new google.maps.Marker({
        map : $scope.map,
        position : latLang,
        title : title
      });
      marker.content = '<div class="infoWindowContent">'
        + marker.title + '</div>';

      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent('<h2>' + marker.title + '</h2>'
          + marker.content);
        infoWindow.open($scope.map, marker);
      });

      $scope.markers.push(marker);

      $scope.map.setCenter(latLang);
    };

    $scope.openInfoWindow = function(e, selectedMarker) {
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
    }*/

    var cities = [
      {
        city : 'India',
        desc : 'This is the best country in the world!',
        lat : 23.200000,
        long : 79.225487
      },
      {
        city : 'New Delhi',
        desc : 'The Heart of India!',
        lat : 28.500000,
        long : 77.250000
      },
      {
        city : 'Mumbai',
        desc : 'Bollywood city!',
        lat : 19.000000,
        long : 72.90000
      },
      {
        city : 'Kolkata',
        desc : 'Howrah Bridge!',
        lat : 22.500000,
        long : 88.400000
      },
      {
        city : 'Chennai  ',
        desc : 'Kathipara Bridge!',
        lat : 13.000000,
        long : 80.250000
      }
    ];

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
        $scope.Timer = setInterval(function () {
          $scope.$apply(function () {
            getCurrentData();
          });
        }, 4000);

        listen();
      }
    });

    var createMarker = function (info, data){

      var marker = new google.maps.Marker({
        map: $scope.map,
        position: new google.maps.LatLng(info.lat, info.long),
        title: info.UseName + "-"+ info.code
      });
      //marker.content = '<div class="infoWindowContent">' + info.code + '</div>';
      //{"Date":"7-12-2017","Time":"0-14-2","Temperature":"22.60","Radiant":"-1.29",
      if (data !== undefined && data !== null && data.Date !== undefined){
        marker.content = '<div class="infoWindowContent">' + 'Date:' + data.Date +'<br>' + 'Time:' + data.Time +'<br>' + 'Temperature:' + data.Temperature +'<br>' + 'Radiant:' + data.Radiant +'<br>' +'</div>';
      }
      else marker.content = '<div class="infoWindowContent">No Data</div>';
      google.maps.event.addListener(marker, 'click', function(){
        infoWindow.setContent('<h4>' + marker.title + '</h4>' + marker.content);
        infoWindow.open($scope.map, marker);
      });
      $scope.markers = [];
      $scope.markers.push(marker);
    };


    $scope.openInfoWindow = function(e, selectedMarker){
      console.log("selectedMarker");
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
    };

    $scope.$on("$destroy",function(){
      console.log("destroy google maps");
      clearInterval($scope.Timer)
    });
  }]);

