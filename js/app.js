
  

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
         .when("/subject/:idsubject/:namesubject", {
 
             controller: "examController",
 
             templateUrl: "thi.html"
         })
         .when("/summary/:idhistory", {
             controller: "historyController",
 
             templateUrl: "ketqua.html"
         })
         .when("/history/:idhistory", {
             controller: "historyController",
             templateUrl: "history.html"
         })
         .when("/listHistory/:iduser", {
            controller: "listhistoryController",
            templateUrl: "listHistory.html"
        })
         .when("/profile", {
            controller: "profileController",

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

myApp.controller("profileController", function($scope,$http ,$rootScope){
    $scope.gender = [{bool : true , text : "Nam"} ,{bool : false , text : "Nữ"} ]

    var userjson = sessionStorage.getItem("user");
    if(userjson != null){
        $scope.user = angular.copy(JSON.parse(userjson));

    }

    $scope.editUser = function(){
        $scope.user.gender = ($scope.user.gender == 'true' ) ? true : false;

        $http.put("https://localhost:5001/api/Student", $scope.user).then(function(r){
            if(r.data.isSuccess){
                $scope.message = r.data.message; 
                $rootScope.user = r.data.infoUser;
                $rootScope.user.gender = $rootScope.user.gender.toString();
           
                sessionStorage.setItem("user" , JSON.stringify($rootScope.user));
                $scope.user =  $rootScope.user ;

            }
        })
        
    }
})

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
                         $rootScope.user.gender = $rootScope.user.gender.toString();
                         sessionStorage.setItem("user" , JSON.stringify(user.infoUser));
                         location.href = '#home'
                    }else { 
                        $scope.userLogin.isSuccess = false; 
                        $rootScope.isLogin = false;   
                    }
    
            });
        }else location.href = '#home'
     
    }


});
    
myApp.controller("subjectController" , function($scope , $http){
    $http.get("https://localhost:5001/Subject").then(function(response){
        
        $scope.subjects = response.data;

    })

    $scope.search;

}) ;



// window.onbeforeunload = function() {
//   }


