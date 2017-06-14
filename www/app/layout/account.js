(function(){
angular
    .module('app.layout')
    .controller('app.layout.Account', Account);

Account.$inject = ['$scope'];

function Account($scope) {
    $scope.settings = {
        enableFriends: true
    };    
}

})();