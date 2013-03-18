'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['services', 'ngResource']).
    config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider.when('/', {templateUrl: 'assets/partials/test.html', controller: TestCtrl});
        $routeProvider.when('/login', {templateUrl: 'assets/partials/login.html', controller: LoginCtrl});
        $routeProvider.when('/register', {templateUrl: 'assets/partials/register.html', controller: RegisterCtrl});
        $routeProvider.otherwise({redirectTo: 'assets/partials/test.html'});

        $httpProvider.responseInterceptors.push('httpInterceptor');
    }])

    .factory('httpInterceptor', ['$rootScope', '$q', function ($rootScope, $q) {
        return function (promise) {
            function isErrorResponse(obj){
                return obj && obj.hasOwnProperty('error');
            }

            return promise.then(function (response) {
                if(isErrorResponse(response.data)){
                    console.log('error detected broadcasting appError');
                    $rootScope.$broadcast('appError', response.data.error);
                    return $q.reject(response.data.error);
                }
                return response;
            }, function (response) {
                // do something on error
                return $q.reject(response);
            });
        };
    }]);

