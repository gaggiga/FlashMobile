(function(){

angular
  .module('app.services')
  .factory('app.services.serverManager', serverManager);
  
serverManager.$inject = ['app.services.Settings', '$http', '$q'];

function serverManager(Settings, $http, $q) {

  var manager = {
      getChats: getChats,
      newChat: newChat,
      addDevice: addDevice
  };

  return manager;  

  function addDevice(){
    return formPost(Settings.serverURI + "api/device/add", { 
                deviceIdentifier: Settings.deviceId, 
                callerIdentifier: Settings.callerId
            }).then(Settings.setRegistrato, errorCallback);
  }

  function getChats(){
    // TODO: Ottenere le chat per il callerIdentifier
    return $q(function(resolve, reject){ resolve([]); });
  }

  function newChat(contattoId){
    // TODO    
    //return formPost(Settings.serverURI + "api/chat/create", [Settings.callerId, contattoId]);    
    return $q(function(resolve, reject){ resolve({ id: guid(), callerIndentifiers: [Settings.callerId, contattoId] }); });
  }

  function errorCallback(err){
    Console.log('Errore');
    Console.log(err);
  }

  function formPost(url, data){
      return $http({
            method: 'POST',
            url: url,
            data: data,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },            
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}        
        });
  }

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
})();