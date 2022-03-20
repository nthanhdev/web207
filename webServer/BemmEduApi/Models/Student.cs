
using System;
namespace BemmEduApi.Models { 

    public class StudentAccount { 

        
        public string username {get;set;}

        public string password {get;set;}
         

    }
    public class Student : StudentAccount { 

        public string fullname {get;set;}

        public string email {get ; set;}

        public bool gender {get;set;} 

        public DateTime birthday {get; set;}

        public double schoolfee {get;set;} 

        public double marks {get;set;}

    }
}