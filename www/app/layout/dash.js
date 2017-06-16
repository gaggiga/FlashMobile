(function(){
angular
    .module('app.layout')
    .controller('app.layout.Dash', Dash);

Dash.$inject = ['$scope', 'app.services.Settings', 'app.services.serverManager', '$ionicLoading'];

function Dash($scope, Settings, serverManager, $ionicLoading) {
    var vm = this;
    vm.settings = Settings;

    vm.rimuovi = rimuovi;
    vm.registrati = registrati;

    function rimuovi(){

    }

    function registrati(){
        $ionicLoading.show({
          template: '<p>Loading...</p><ion-spinner></ion-spinner>'
        });
        serverManager.addDevice().then(function(){
            $ionicLoading.hide();
        });
    }
}
})();