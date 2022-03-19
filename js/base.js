

var myApp = angular.module('app', []) ; 


myApp.controller("mainController" , function($scope , $rootScope) { 

    $rootScope.urlLink = "Listsubjects.html"

    $rootScope.toLink = function(url) { 
        $rootScope.urlLink = url;
    }

});

    


