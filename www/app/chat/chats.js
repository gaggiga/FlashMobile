(function(){
angular
    .module('app.chat')
    .controller('app.chat.Chats', Chats);

Chats.$inject = ['$scope', 'app.services.ChatRepository', '$cordovaContacts', '$ionicLoading', '$state'];

function Chats($scope, ChatRepository, $cordovaContacts, $ionicLoading, $state) {
  var vm = this;
  vm.chats = ChatRepository.all();
  vm.rimuovi = rimuovi;
  vm.nuova = nuova;
  vm.refresh = refresh;

  function rimuovi(chat) {
    ChatRepository.remove(chat);
  }    

  function nuova(){
    $cordovaContacts.pickContact().then(function (contactPicked) {
      if(contactPicked.phoneNumbers){
        $ionicLoading.show({
          template: '<p>Loading...</p><ion-spinner></ion-spinner>'
        });

        var contattoId = contactPicked.phoneNumbers[0].value;
        contattoId = contattoId.replace(/ /g, "");
        var foto = contactPicked && contactPicked.photos && contactPicked.photos[0] ? contactPicked.photos[0].value : '';
        ChatRepository.add(contattoId, contactPicked.displayName, foto).then(function(chat){
          vm.chats = ChatRepository.all();
          $ionicLoading.hide();
          $state.go('tab.chat-detail', {chatId: chat.id});
        });
      }
    });
  }

  function refresh(){
    ChatRepository.refresh().then(function(){
      $scope.$broadcast('scroll.refreshComplete');
      vm.chats = ChatRepository.all();
    });
  }
}
})();