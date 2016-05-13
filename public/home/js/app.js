var app = angular.module('app', ['ui.router']);


//controller ---------------------------------------

app.controller('MainCtrl', function($scope, posts){

  $scope.posts =[
    {title: 'post 1', upvotes: 5},
    {title: 'post 2', upvotes: 10},
    {title: 'post 3', upvotes: 7},
    {title: 'post 4', upvotes: 3}
  ];


  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0
    });
    $scope.title = '';
    $scope.link = '';
  };

$scope.incrementUpvotes = function(post){
  post.upvotes += 1;
};

$scope.posts = posts.posts;

});




//services and factories--------------------------------------------

app.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}]);




//routes------------------------------------------------

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home',{
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
    });

    $urlRouterProvider.otherwise('home');
});
