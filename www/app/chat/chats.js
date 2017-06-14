(function(){
angular
    .module('app.chat')
    .controller('app.chat.Chats', Chats);

Chats.$inject = ['$scope', 'app.services.ChatRepository'];

function Chats($scope, ChatRepository) {
  $scope.chats = ChatRepository.all();
  $scope.remove = remove;
  
  function remove(chat) {
    ChatRepository.remove(chat);
  }    
}
})();