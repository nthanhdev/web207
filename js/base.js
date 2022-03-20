

var myApp = angular.module('app', ["ngRoute"]) ; 


myApp.config(function($routeProvider , $locationProvider){
   $locationProvider.hashPrefix(''); // add configuration
    $routeProvider
        .when("/home", {
            templateUrl: "listsubjects.html"
        })
        .when("/signin", {
            templateUrl: "login.html"
        })
        .when("/signup", {
            templateUrl: "reg.html"
        })
        .when("/contact", {
            templateUrl: "contact.html"
        })
        .when("/subject/:idsubject", {
            templateUrl: "thi.html"
        })
        .when("/summary/:idsummary", {
            templateUrl: "ketqua.html"
        })
        .when("/history/:idhistory", {
            templateUrl: "history.html"
        })
        .otherwise({templateUrl: "listsubjects.html"})
})

myApp.controller("mainController" , function($scope , $rootScope) { 

    $rootScope.urlLink = "Listsubjects.html"

    $rootScope.toLink = function(url) { 
        $rootScope.urlLink = url;
    }

});

    


