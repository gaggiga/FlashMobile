(function(){
angular
    .module('app.chat')
    .controller('app.chat.ChatDetail', ChatDetail);

ChatDetail.$inject = ['$scope', '$stateParams', 'app.services.ChatRepository'];

function ChatDetail($scope, $stateParams, ChatRepository) {
  $scope.chat = ChatRepository.get($stateParams.chatId);
}
})();