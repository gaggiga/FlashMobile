(function(){

angular
  .module('app.services')
  .factory('app.services.Settings', Settings);
  
Settings.$inject = ['$q', '$timeout', '$cordovaDevice', 'app.services.simPlugin', '$localForage'];

function Settings($q, $timeout, $cordovaDevice, simPlugin, $localForage) {
  var statoEnum = {
      daRegistrare: 0, registrato: 1
  }

  var mySettings = {
    isRegistrato: false, 
    callerId: '',
    deviceId: '', 
    serverURI: 'http://flashmobileservices.azurewebsites.net/',
    setRegistrato: setRegistrato
  };

  init();

  return mySettings;  

  function init(){
    document.addEventListener("deviceready", onDeviceReady, false);

    return $q(function(resolve, reject){
        $localForage.getItem('stato').then(function(stato){
          if(stato){
            mySettings.isRegistrato = stato == statoEnum.registrato;
          }           
        });      
    });
  }

  function setRegistrato(){
      return $localForage.setItem('stato', statoEnum.registrato).then(
        function(stato){
          $localForage.getItem('stato').then(function(stato) {
            if(stato){
              mySettings.isRegistrato = stato == statoEnum.registrato;
            }           
          });        
        }
      );      
  }

  function onDeviceReady(){
      mySettings.deviceId = $cordovaDevice.getUUID(); 

      if($cordovaDevice.getPlatform() == "Android"){
        simPlugin.hasReadPermission().then(
          function(info){
            if(!info){
              simPlugin.requestReadPermission().then(function(){
                  simPlugin.getSimInfo().then(simInfo, errorCallback);        
              }, errorCallback);
            } else {
              simPlugin.getSimInfo().then(simInfo, errorCallback);
            }
          }          
        );          
      } else {
        simPlugin.getSimInfo().then(simInfo, errorCallback);
      }      
  }

  function simInfo(info){
    if(info && info.phoneNumber){
      mySettings.callerId = info.phoneNumber;
    }
  }

  function errorCallback(err){
    Console.log('Errore');
    Console.log(err);
  }
}
})();