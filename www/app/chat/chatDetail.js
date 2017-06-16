(function(){
angular
    .module('app.chat')
    .controller('app.chat.ChatDetail', ChatDetail);

ChatDetail.$inject = ['$scope', '$stateParams', 'app.services.ChatRepository', '$timeout', '$ionicScrollDelegate', '$cordovaKeyboard', 'app.services.Settings'];

// TODO: Solo abbozzato per demo
function ChatDetail($scope, $stateParams, ChatRepository, $timeout, $ionicScrollDelegate, $cordovaKeyboard, Settings) {
  var vm = this;
  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  vm.chat = ChatRepository.get($stateParams.chatId);
  vm.myCallerIndentifier = Settings.callerId;
  vm.message = '';
  vm.sendMessage = sendMessage;
  vm.inputUp = inputUp;
  vm.inputDown = inputDown;
  vm.closeKeyboard = closeKeyboard; 

  function sendMessage(){
    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    vm.chat.messages.push({
      userId: Settings.callerId,
      text: vm.message,
      time: d
    });

    vm.message = '';
    $ionicScrollDelegate.scrollBottom(true);
  }

  function inputUp() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  function inputDown() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  function closeKeyboard() {
    $cordovaKeyboard.close();
  };
}
})();