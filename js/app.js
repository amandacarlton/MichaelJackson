var app = angular.module("MichaelJackson", ['ngRoute']);


app.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      }).when('/cart', {
        templateUrl:'partials/cart.html',
        controller: 'CartController'
      });

      $locationProvider.html5Mode(true);
  });
