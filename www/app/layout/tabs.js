(function(){
angular
    .module('app.layout')
    .controller('app.layout.Tabs', Tabs);

Tabs.$inject = ['$scope', 'app.services.Settings'];

function Tabs($scope, Settings) {
    var tabs = this;
    tabs.settings = Settings;
}
})();