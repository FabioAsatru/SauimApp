angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Post', function($http) {
  // Might use a resource here that returns a JSON array
  var post = [];
  // Some fake testing data 
  return {

    popula: function(banco){
      post = banco;
      console.log(banco);
      console.log(post);
    },
    all: function() {
      return post;
    },
    remove: function(post) {
      chats.splice(post.indexOf(post), 1);
    },
     get: function(postId) {
      
       //return post; 
       

      for (var i = 0; i < 12; i++) {
        console.log("entrou");
        console.log(i);
        console.log(post[i].id)
        if (post[i].id == postId) {
          return post[i];
        }
      }
      return null;
    }

  };
});


