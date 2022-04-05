
using System;
using System.IO;
using Newtonsoft.Json;
using BemmEduApi.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace BemmEduApi
{


    public class DbcontextFile
    {

        private string getTypeRead(Type T) { 

            string json = "";
            switch(T.Name){
                case "Student" :  json = ReadFile("db/students.js"); break;
                case "Subject" :  json = ReadFile("db/subjects.js"); break;
                case "ResultQuiz" : json =  ReadFile("db/histories.js"); break;
            }
            return json;
        }

           private string getTypePath(Type T) { 

            string path = "";
            switch(T.Name){
                case "Student" :  path = "db/students.js"; break;
                case "Subject" :  path = "db/subjects.js"; break;
                case "ResultQuiz" : path =  "db/histories.js"; break;
                case "historiesQuiz" : path =  "db/histories.js"; break;

            }
            return path;
        }
        // 
        private string ReadFile(string path)
        {
            
            try
            {
      
                using (var sr = new StreamReader(  path ))
                {
                 
                    return sr.ReadToEnd();
                }
            }
            catch (IOException)
            {
         
             
                return "";
            }
        }
        public List<T> GetDataDb<T> ()
        {
          
             string json = getTypeRead(typeof(T));
             var ListData  =  JsonConvert.DeserializeObject<List<T>>(json) ;
             return ListData;
        }

        public List<Quiz> GetQuizzes(string Id) {

            string json = ReadFile($"db/Quizs/{Id}.js");
            var ListData = JsonConvert.DeserializeObject<List<Quiz>>(json);
            return ListData;
        }
        

        public  async Task<bool> SaveDataDbAsync<T>(List<T> objects  ) { 
            
            string path = getTypePath(typeof(T));
            string text = "";
            text= JsonConvert.SerializeObject(objects);
            await File.WriteAllTextAsync(path , text) ;
            return true;
        }

    }
}