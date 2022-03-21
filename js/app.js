
  

var myApp = angular.module('app', ["ngRoute"]) ; 

myApp.config(function($routeProvider , $locationProvider){
   $locationProvider.hashPrefix(''); // add configuration
    $routeProvider
        .when("/home", {
            controller: "subjectController",
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

            controller: "subjectController",

            templateUrl: "thi.html"
        })
        .when("/summary/:idsummary", {
            controller: "subjectController",

            templateUrl: "ketqua.html"
        })
        .when("/history/:idhistory", {
            controller: "subjectController",

            templateUrl: "history.html"
        })
        .when("/profile", {
            templateUrl: "profile.html"
        })
        .otherwise({
            controller: "subjectController",
            templateUrl: "listsubjects.html"
        })
})

myApp.controller("mainController" , function($scope , $rootScope) { 
    $scope.nav = true;
    $scope.hideNav = function() {

        $scope.nav = !$scope.nav;
    }
    var userjson = sessionStorage.getItem("user");
    if(userjson != null){
        $rootScope.user = JSON.parse(userjson);
        $rootScope.isLogin = true;
    }else 
        $rootScope.isLogin = false;

    
        $scope.logout = function() { 
            sessionStorage.clear();
            $rootScope.isLogin = false;

            location.href = '#signin'
            
        }
});



myApp.controller("accountController" , function($scope , $rootScope , $http) { 

    if($rootScope.isLogin){
        location.href = '#home'
    }

    
    $scope.userLogin = {"user" : "", pass: "", isSuccess: true};
    $scope.login = function() { 
        
        // check đã login chưa 
        if(!$rootScope.isLogin){
            var data = {username:  $scope.userLogin.user ,  password: $scope.userLogin.pass  };
            $http.post("https://localhost:5001/api/Student/Login" ,data).then(function(response){
    
                    var user = response.data;
                    if(user.success) { 
                        $scope.userLogin.isSuccess = true;
                        $rootScope.isLogin = true;
                         $rootScope.user = user.infoUser;
                        
                        location.href = '#home'
                        sessionStorage.setItem("user" , JSON.stringify(user.infoUser));
                    }else { 
                        $scope.userLogin.isSuccess = false; 
                        $rootScope.isLogin = false;
                    }
    
            },   $scope.userLogin.isSuccess = false );
        }else location.href = '#home'
     
    }


});
    
myApp.controller("subjectController" , function($scope , $http){
    $scope.ma = "cp mja"
    $http.get("https://localhost:5001/Subject").then(function(response){
        
        $scope.subjects = response.data;
        console.log(response.data);

    })

}) ;


