(function(){

angular
  .module('app.services')
  .factory('app.services.serverManager', serverManager);
  
serverManager.$inject = ['app.services.Settings', '$http'];

function serverManager(Settings, $http) {

  var manager = {
      addDevice: addDevice
  };

  return manager;  

  function addDevice(){
    return formPost(Settings.serverURI + "api/device/add", { 
                deviceIdentifier: Settings.deviceId, 
                callerIdentifier: Settings.callerId
            }).then(Settings.setRegistrato, errorCallback);
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
}
})();