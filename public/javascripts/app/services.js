'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services', [])
    .factory('User', function($resource){

        return $resource("/api/users");
    });