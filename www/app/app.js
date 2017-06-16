(function(){

angular.module('app', [
  'ionic', 
  'ngCordova',
  'LocalForageModule',
  'app.chat', 
  'app.layout',
  'app.services'])
.run(run)
.config(config);

run.$inject = ['$ionicPlatform'];

function run($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}

config.$inject = ['$stateProvider', '$urlRouterProvider', '$localForageProvider'];

function config($stateProvider, $urlRouterProvider, $localForageProvider) {

  $stateProvider
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'app/layout/tabs.html',
      controller: 'app.layout.Tabs',
      controllerAs:'tabs'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');    
  
  $localForageProvider.config({
        driver      : ['asyncStorage', 'webSQLStorage', 'localStorageWrapper'], 
        name        : 'MyLocalForageDbName', 
        size        : 200*1024*1024
    });
}

})();

