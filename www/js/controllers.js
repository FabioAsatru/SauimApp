angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope, $http, $ionicModal, $cordovaCamera, $ionicLoading, Post, $cordovaGeolocation)  {

$scope.lista = [];
$scope.btn = false;
$scope.btn2 = true;
$scope.btn3 = false;
$scope.lat = 1;
$scope.long = 2;
$scope.data = new Date();


$scope.localizar = function(){

            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            
            $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
            var lat  = position.coords.latitude
            var long = position.coords.longitude
            $scope.lat = lat;
            $scope.long = long;
            console.log('lat', lat);
            console.log('long', long); 

      }, function(err) {
      // error
      });



      }

$scope.localizar();



$scope.carregarFoto = function(){
$scope.btn2 = false;
$scope.btn3 = true;

    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
   
     $scope.foto  = "data:image/jpeg;base64," + imageData;

    }, function(err) {
   
    });


}

$scope.carregar = function(){
var valores = {
  parametros:'carregaCategorias',
  pagina:$scope.lista.length
}
$http({
      method:'POST',
      url: 'http://localhost:5050/fotoapi/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
     $scope.lista = data;
     Post.popula(data);
     console.log(data);

    }).error(function(data){

    });
}
$scope.carregar();




$scope.paginacao = function(){
var valores = {
  parametros:'carregaCategorias',
  pagina:$scope.lista.length
}

$http({
      method:'POST',
      url: 'http://localhost:5050/fotoapi/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      
     if(data.length == 0){
   
     $scope.btn = true;

     }else{

     for (var i = 0; i < data.length; i++) {  
     $scope.lista.push(angular.copy(data[i]))
     };

     }

    $scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function(data){
    $scope.$broadcast('scroll.infiniteScrollComplete');
    });

}


$scope.enviarFoto = function(nome){

var valores = {
  parametros:'cadastrar',
  nome:nome,
  foto:$scope.foto,
  latitude:$scope.lat,
  longitude:$scope.long,
  data:$scope.data,
  pagina:0
}

$ionicLoading.show({
      template: 'Enviando foto...'
    });

$http({
      method:'POST',
      url: 'http://localhost:5050/fotoapi/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
     delete $scope.lista;
     $scope.lista = data;
     Post.popula(data); 
     $scope.limpar();
     $ionicLoading.hide();
    }).error(function(data){
     $ionicLoading.hide();
    });
}

$scope.limpar = function(){
$scope.btn2 = true;
$scope.btn3 = false;
}





//===========================================================================================
  $ionicModal.fromTemplateUrl('templates/foto.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeFoto = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.Showfoto = function() {
    $scope.modal.show();
  };


})


.controller('DashDetailCtrl', function($scope, $stateParams, Post){

    $scope.post = Post.get($stateParams.postId);

    $scope.teste = 'teste';
})


.controller('WikiCtrl', function($scope, $stateParams){

    
})




.controller('ChatsCtrl', function($scope, Chats) {


  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})



.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
