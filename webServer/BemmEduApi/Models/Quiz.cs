using System;
using System.Collections.Generic;

namespace BemmEduApi.Models {
    public class Asnwer{

        public int Id {get;set;}

        public string Text {get;set;}
    }
    public class Quiz{

        public int Id {get;set;}

        public string Text {get; set;}

        public double Marks {get;set;}

        public int AnswerId {get;set;}

        public List<Asnwer> Answers {get;set;}

        public int answer {get;set;}
    }

    public class ResultQuiz { 

        public Guid Id {get;set;}
        public string Message {get;set;}
        
        public DateTime Time {get;set;}

        public string Name {get;set;}
        public int correct {get;set;}

        public int incorrect {get;set;}
        public double Mark {get;set;}

        
        public List<Quiz> quiz {get;set;}

    }
}