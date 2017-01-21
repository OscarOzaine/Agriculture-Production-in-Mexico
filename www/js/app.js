// Ionic Starter App

angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('prodag', [
  'ionic',
  'angularMoment',
  'prodag.controllers',
  'prodag.directives',
  'prodag.filters',
  'prodag.services',
  'prodag.factories',
  'prodag.config',
  'prodag.views',
  'underscore',
  'ngResource',
  'ngCordova',
  'slugifier',
  'chart.js'
])

.run(function($ionicPlatform, /*PushNotificationsService,*/ $rootScope, $ionicConfig, $timeout) {

  $ionicPlatform.on("deviceready", function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    //PushNotificationsService.register();
  });

  // This fixes transitions for transparent background views
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    if (toState.name.indexOf('auth.walkthrough') > -1)
    {
      // set transitions to android to avoid weird visual effect in the walkthrough transitions
      $timeout(function() {
        $ionicConfig.views.transition('android');
        $ionicConfig.views.swipeBackEnabled(false);
      	console.log("setting transition to android and disabling swipe back");
      }, 0);
    }
  });
  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
    if (toState.name.indexOf('app.feeds-categories') > -1)
    {
      // Restore platform default transition. We are just hardcoding android transitions to auth views.
      $ionicConfig.views.transition('platform');
      // If it's ios, then enable swipe back again
      if (ionic.Platform.isIOS())
      {
        $ionicConfig.views.swipeBackEnabled(true);
      }
    	console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
    }
  });
  /*
  $ionicPlatform.on("resume", function() {
    PushNotificationsService.register();
  });
  */
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/app/side-menu.html",
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "views/app/home.html",
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.about-me', {
    url: "/about-me",
    views: {
      'menuContent': {
        templateUrl: "views/app/about-me.html",
        controller: 'AboutMeCtrl'
      }
    }
  })

  .state('app.cultivos', {
    url: "/cultivos",
    views: {
      'menuContent': {
        templateUrl: "views/app/cultivos.html",
        controller: 'CultivosCtrl'
      }
    }
  })

  .state('app.cultivos-stats', {
    url: "/cultivos-stats/:cultivoId",
    views: {
      'menuContent': {
        templateUrl: "views/app/cultivos-stats.html",
        controller: 'CultivosStatsCtrl'
      }
    }
  })

  .state('app.cultivos-descripcion', {
    url: "/cultivos-descripcion/:cultivoId",
    views: {
      'menuContent': {
        templateUrl: "views/app/cultivos-descripcion.html",
        controller: 'CultivosCtrl'
      }
    }
  })

  .state('app.estados', {
    url: "/estados",
    views: {
      'menuContent': {
        templateUrl: "views/app/estados.html",
        controller: 'EstadosCtrl'
      }
    }
  })

  .state('app.estados-stats', {
    url: "/estados/:estadoId/stats",
    views: {
      'menuContent': {
        templateUrl: "views/app/estados-stats.html",
        controller: 'EstadosStatsCtrl'
      }
    }
  })

  .state('app.estados-stats-cultivo', {
    url: "/estados/:estadoId/stats/:cultivoId",
    views: {
      'menuContent': {
        templateUrl: "views/app/estados-stats-cultivos.html",
        controller: 'EstadosStatsCultivosCtrl'
      }
    }
  })

  .state('app.estados-municipios', {
    url: "/estados/:estadoId/municipios",
    views: {
      'menuContent': {
        templateUrl: "views/app/municipios.html",
        controller: 'EstadosMunicipiosCtrl'
      }
    }
  })

  .state('app.estados-municipios-stats', {
    url: "/estados/:estadoId/municipios/:municipioId",
    views: {
      'menuContent': {
        templateUrl: "views/app/municipios-stats.html",
        controller: 'EstadosMunicipiosStatsCtrl'
      }
    }
  })

  .state('app.estados-municipios-cultivos-stats', {
    url: "/estados/:estadoId/municipios/:municipioId/cultivos-stats/:cultivoId",
    views: {
      'menuContent': {
        templateUrl: "views/app/municipios-cultivos-stats.html",
        controller: 'EstadosMunicipiosCultivosStatsCtrl'
      }
    }
  })

  //LAYOUTS
  .state('app.layouts', {
    url: "/layouts",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/layouts.html"
      }
    }
  })

  .state('app.slider', {
    url: "/layouts/slider",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/slider.html"
      }
    }
  })
;

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/auth/walkthrough');
  $urlRouterProvider.otherwise('/app/estados');
});
