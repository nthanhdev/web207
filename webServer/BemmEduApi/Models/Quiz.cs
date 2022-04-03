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

        public Asnwer answer {get;set;}
    }
}