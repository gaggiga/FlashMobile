(function(){

angular
    .module('app.chat', [])
    .config(config);

config.$inject = ['$stateProvider'];

function config($stateProvider) {
  $stateProvider
    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'app/chat/chats.html',
          controller: 'app.chat.Chats'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'app/chat/chatDetail.html',
          controller: 'app.chat.ChatDetail'
        }
      }
    });
}

})();
