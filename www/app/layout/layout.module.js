(function(){

angular
    .module('app.layout', [])
    .config(config);

config.$inject = ['$stateProvider'];

function config($stateProvider) {
  $stateProvider
    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'app/layout/dash.html',
          controller: 'app.layout.Dash',
          controllerAs: 'vm'
        }
      }
    })
    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'app/layout/account.html',
          controller: 'app.layout.Account'
        }
      }
    });
}

})();