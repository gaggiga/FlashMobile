(function(){

angular
  .module('app.services')
  .factory('app.services.simPlugin', simPlugin);
  
simPlugin.$inject = ['$q'];

function simPlugin($q) {
  return {
    getSimInfo: getSimInfo,
    hasReadPermission: hasReadPermission,
    requestReadPermission: requestReadPermission
  };
  
  function getSimInfo(){
    return $q(function(resolve, reject){
      if(window.plugins && window.plugins.sim){
        window.plugins.sim.getSimInfo(resolve, reject);
      } else {
        resolve({phoneNumber: "123456"});
      }      
    });
  }

  function hasReadPermission(){    
    return $q(function(resolve, reject){
      if(window.plugins && window.plugins.sim){
        window.plugins.sim.hasReadPermission(resolve, reject);
      } else {
        resolve(true);
      }
    });
  }

  function requestReadPermission(){
    return $q(function(resolve, reject){
      if(window.plugins && window.plugins.sim){
        window.plugins.sim.requestReadPermission(resolve, reject);
      } else {
        resolve();
      }
    });
  }
}
})();