
  

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
    $http.get("https://localhost:5001/Subject").then(function(response){
        
        $scope.subjects = response.data;

    })

}) ;

myApp.controller("examController" , function($scope , $http , $routeParams , $interval)  {

    var Minutes = 5;
    var Seconds = 0;

    $scope.time = new Date().setMinutes(Minutes,Seconds);
    
    function getPercent(data) {

        var date = new Date(data);
        var total = Minutes * 60 + Seconds;
        var m1= date.getMinutes() * 60
        var s1 = date.getSeconds();
        var sum = m1 + s1;
        var result = (sum *100) / total
        $scope.PercentTime = 
        $scope.style={'width':result + "%"};
        return result
        
    }

  var timecount =  $interval(function(){
        let date = new Date(  $scope.time )
        var s = Number(date.getSeconds());
        var m =  Number(date.getMinutes());
        if(s == 0 && m == 0){
            $interval.cancel(timecount);
            location.href="#summary/idsummary"
        }else{
          date = date.setSeconds( s- 1);
           $scope.time = date
           console.log(getPercent(date))
        }
    },1000);
    var IdSubject = $routeParams.idsubject ;
    $scope.nameSubject = $routeParams.namesubject;
    $http.get("https://localhost:5001/Exam?Id=" + IdSubject).then(
        function(response) {
            $scope.subject = response.data;
            $scope.Question = $scope.subject[0];
            $scope.CurrentQs = 0;
        }
    )
    

    $scope.Qs = function(num ) { 
        $scope.CurrentQs = num ;
        $scope.Question  = $scope.subject[num];
        $scope.current($scope.Question.id );

    }

    $scope.checkQs = function(idQs,asnwerId) { 
      var qs =   angular.element(document.querySelector("#qs"+idQs))
      qs.removeClass("bg-light text-dark")
      qs.addClass("bg-success text-light")
      $scope.subject[$scope.CurrentQs].answer =asnwerId;
      console.log( $scope.subject)
    }


    $scope.NextQs = function(idQs){
        if($scope.CurrentQs >= $scope.subject.length -1   ) $scope.CurrentQs = 0 ;
        else {
            $scope.CurrentQs++;

        }
        $scope.Qs( $scope.CurrentQs);

        
    }

    $scope.BackQs = function(idQs){
        if($scope.CurrentQs == 0  ) $scope.CurrentQs = $scope.subject.length -1  ;
        else {
            $scope.CurrentQs--;

        }
        $scope.Qs( $scope.CurrentQs);

        
    }
    $scope.current = function(idQs) {
       
        document.getElementById("qs" + idQs).focus();
    }

})


