angular.module('eTurnApp', [
    'ngRoute'
])
.config([
    '$routeProvider','$locationProvider',
    function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/product/:id', {
                templateUrl: 'views/product-details.html',
                controller: 'ProductDetailsCtrl'
            });
    }
]);