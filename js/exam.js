
myApp.controller("examController" , function($scope , $http , $routeParams , $interval , $rootScope )  {

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
        $scope.PercentTime = result;
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
            getPercent(date);
           $scope.time = date
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

    $scope.submit = function(){

       $http.post(`https://localhost:5001/Exam?Name=${$scope.nameSubject}&username=${$rootScope.user.username}` , $scope.subject).then(function(response){

            $scope.result = response.data;
            location.href="#summary/" + $scope.result.id;
            console.log( $scope.result)
            close();
        })

    }


    

})