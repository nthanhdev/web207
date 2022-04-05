
myApp.controller("historyController" , function($scope , $http , $routeParams) {

    var id = $routeParams.idhistory;

    $http.get("https://localhost:5001/Exam/History?id=" + id).then(function(r){

        $scope.result = r.data
        $scope.subject = r.data.quiz
        $scope.Question = $scope.subject[0]
        $scope.CurrentQs = 0;



    })

    
    $scope.Qs = function(num ) { 
        $scope.CurrentQs = num ;
        $scope.Question  = $scope.subject[num];
        $scope.current($scope.Question.id );

    }

    $scope.checkQs = function(idQs,asnwerId) { 
     
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

    $scope.renderclassQS = function(qs){

        if(qs.answer == 0){
            return "btn-qs col-1 mx-1 my-1 bg-light border  py-1 border-success hover-bg rounded text-dark"
        }else if(qs.answer == qs.answerId){
            return "btn-qs col-1 mx-1 my-1 bg-success border  py-1 border-dark hover-bg rounded text-light"
        }else {

            return "btn-qs col-1 mx-1 my-1 bg-danger border  py-1 border-dark hover-bg rounded text-light"
        }
    }

    $scope.renderclassas = function(qs , idanswer){

        if(qs.answer == idanswer){
            if(qs.answer == qs.answerId){
                return "form-check d-flex  justify-content-center  position-relative mt-2 bg-success"
            }else{
                return "form-check d-flex  justify-content-center  position-relative mt-2 bg-danger"
            }
        }else if(idanswer == qs.answerId) {
            return "form-check d-flex  justify-content-center  position-relative mt-2 bg-success"
        }else {
            return "form-check d-flex  justify-content-center  position-relative mt-2 "

        }
    }

   
})

myApp.controller("listhistoryController" , function($scope , $http , $rootScope){
    $http.get(`https://localhost:5001/Exam/GetHistorybyUser?username=${$rootScope.user.username}`).then(function(r){

        $scope.listHistory = r.data;
    })

})