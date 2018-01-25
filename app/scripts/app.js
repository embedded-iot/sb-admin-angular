'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar'
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                      'scripts/directives/google-maps/google-maps.js',
                      'scripts/directives/header/header.js',
                      'scripts/directives/header/header-notification/header-notification.js',
                      'scripts/directives/sidebar/sidebar.js'
                      //'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                      // 'scripts/directives/datetime/rm-datepicker.js',
                      // 'scripts/directives/datetime/rm-datepicker.css',
                      //   'scripts/controllers/httpService.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                }),
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                }),
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                }),
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                }),
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        },

    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        controllerAs : 'vm',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                /*'scripts/directives/header/header.js',
                'scripts/directives/header/header-notification/header-notification.js',
                'scripts/directives/sidebar/sidebar.js',
                'scripts/directives/sidebar/sidebar-search/sidebar-search.js',*/
                'scripts/directives/dashboard/stats/stats.js',

                // 'scripts/directives/timeline/timeline.js',
                // 'scripts/directives/notifications/notifications.js',
                // 'scripts/directives/chat/chat.js',
                // 'bower_components/angular-chart.js/dist/angular-chart.min.js',
                // 'bower_components/angular-chart.js/dist/angular-chart.css',

                'bower_components/highcharts/highcharts.js',
                'bower_components/highcharts/modules/exporting.js',
                'scripts/controllers/httpService.js',
                'scripts/controllers/main.js'
                // 'scripts/directives/timeline/timeline.js',
                // 'scripts/directives/notifications/notifications.js',
                // 'scripts/directives/chat/chat.js',

              ]
            });
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank'
    })
      .state('login',{
        url:'/login',
        controller:'LoginCtrl',
        controllerAs : 'vm',
        replace: true,
        templateUrl:'views/pages/login.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                'scripts/controllers/httpService.js',
                'scripts/controllers/loginController.js'
              ]
            })
          }
        }
      })
      .state('dashboard.downloadYear',{
        url:'/downloadYear',
        controller: 'downloadYearCtrl',
        controllerAs : 'vm',
        templateUrl:'views/download/downloadYear.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                'scripts/controllers/httpService.js',
                'scripts/controllers/downloadYear.js'
              ]
            })
          }
        }
      })
      .state('dashboard.downloadMonth',{
        url:'/downloadMonth',
        controller: 'downloadMonthCtrl',
        templateUrl:'views/download/downloadMonth.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                'scripts/controllers/httpService.js',
                'scripts/controllers/downloadMonth.js'
              ]
            })
          }
        }
      })
      .state('dashboard.downloadDay',{
        url:'/downloadDay',
        controller: 'downloadDayCtrl',
        templateUrl:'views/download/downloadDay.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                'scripts/controllers/httpService.js',
                'scripts/controllers/downloadDay.js'
              ]
            })
          }
        }
      })
      .state('dashboard.googleMaps',{
        url:'/googleMaps',
        controller: 'googleMapsCtrl',
        templateUrl:'views/maps/googleMaps.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                'scripts/controllers/httpService.js',
                'scripts/directives/google-maps/google-maps.js',
                'scripts/controllers/mapsController.js'
              ]
            })
          }
        }
      })
      .state('dashboard.chart',{
        url:'/chart',
        controller:'ChartCtrl',
        controllerAs: 'vm',
        templateUrl:'views/chart.html',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                'scripts/directives/datetime/rm-datepicker.js',
                'scripts/directives/datetime/rm-datepicker.css',
                // 'bower_components/angular-datepicker/dist/angular-datepicker.js',
                // 'bower_components/angular-datepicker/dist/angular-datepicker.css',
                // 'bower_components/angular-chart.js/dist/angular-chart.min.js',
                // 'bower_components/angular-chart.js/dist/angular-chart.css',
                // 'bower_components/highcharts/highstock.js.map',
                'bower_components/highcharts/highcharts.js',
                'bower_components/highcharts/modules/exporting.js',
                'scripts/controllers/httpService.js',
                'scripts/controllers/chartContoller.js'
              ]
            })/*,
            $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/chartContoller.js']
            })*/
          }
        }

    })
      .state('dashboard.table',{
        url:'/table',
        controller:'ngTableCtrl',
        controllerAs: 'vm',
        templateUrl:'views/table.html',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                // 'scripts/directives/header/header.js',
                // 'scripts/directives/sidebar/sidebar.js',
                // 'views/dashboard/main.html',

                'scripts/directives/datetime/rm-datepicker.js',
                'scripts/directives/datetime/rm-datepicker.css',
                // 'bower_components/table/ng-table.js',
                // 'bower_components/table/ng-table.css',

                'scripts/controllers/httpService.js',
                'scripts/controllers/tableController.js'
              ]
            })
          }
        }
    })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid'
   })
  }]);

    
