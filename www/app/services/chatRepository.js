(function(){

angular
  .module('app.services')
  .factory('app.services.ChatRepository', ChatRepository);
  
ChatRepository.$inject = ['$q', 'app.services.serverManager', '$localForage'];

function ChatRepository($q, serverManager, $localForage) {

  var chats = [];

  return {
    init: init,
    refresh: refresh,
    all: all, 
    remove: remove,
    get: get,
    add: add
  };

  function init(){
    return $localForage.getItem('chats').then(function(data) {
        if(data){
          chats = data;
        }       
      });          
  }

  function refresh(){   
    return serverManager.getChats().then(save);      
  }

  function all() {
    return chats;
  }

  function remove(chat) {
    chats.splice(chats.indexOf(chat), 1);
  }

  function get(chatId) {
    for (var i = 0; i < chats.length; i++) {
      if (chats[i].id === chatId) {
        return chats[i];
      }
    }
    return null;
  }

  function add(contattoId, nome, foto){
      return serverManager.newChat(contattoId).then(function(data){
          var chat = {
            id: data.id,
            name: nome,
            callerIndentifiers: data.callerIndentifiers,
            lastText: '',
            face: foto
          };

          chats.push(chat);
          save(chats);       
          return chat;   
      });    
  }

  function save(chats){
    return $q(function(resolve, reject){
      $localForage.setItem('chats', chats).then(
          function(){
            return $localForage.getItem('chats').then(function(data) {
                chats = data;
                resolve();
            });        
          }
        )
    });         
  }
}
})();