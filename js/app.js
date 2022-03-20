
  

var myApp = angular.module('app', ["ngRoute"]) ; 

myApp.config(function($routeProvider , $locationProvider){
   $locationProvider.hashPrefix(''); // add configuration
    $routeProvider
        .when("/home", {
            templateUrl: "listsubjects.html"
        })
        .when("/signin", {
            controller: "accountController",

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
    $rootScope.isLogin = false;

});



myApp.controller("accountController" , function($scope , $rootScope , $http) { 

    $scope.userLogin = {"user" : "", pass: "", isSuccess: true};
    $scope.login = function() { 
        var data = {username:  $scope.userLogin.user ,  password: $scope.userLogin.pass  };
        $http.post("https://localhost:5001/api/Student/Login" ,data).then(function(response){

                var user = response.data;
                if(user.success) { 
                    $scope.userLogin.isSuccess = true;
                    $rootScope.isLogin = true;
                    $rootScope.user = user.infoUser;
                    location.href = '#home'
                }else { 
                    $scope.userLogin.isSuccess = false; 
                    $rootScope.isLogin = false;


                }

        })
     
    }

});
    


