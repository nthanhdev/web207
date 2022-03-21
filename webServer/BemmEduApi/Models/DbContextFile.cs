
using System;
using System.IO;
using Newtonsoft.Json;
using BemmEduApi.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace BemmEduApi
{


    public class DbcontextFile
    {

        private string getTypeRead(Type T) { 

            string json = "";
            switch(T.Name){
                case "Student" :  json = ReadFile("db/students.js"); break;
                case "Subject" :  json = ReadFile("db/subjects.js"); break;
            }
            return json;
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
            catch (IOException e)
            {
         
                Console.WriteLine(e.Message);
                return "";
            }
        }
        public List<T> GetDataDb<T> ()
        {
          
             string json = getTypeRead(typeof(T));
             var ListData  =  JsonConvert.DeserializeObject<List<T>>(json) ;
             return ListData;
        }

        public async Task SaveDataDbAsync<T>(List<T> objects ) { 
            string path = "";
            switch(typeof(T).Name) {

                case "Student" : path = "db/students.js" ; break;
                
            }
            string text = JsonConvert.SerializeObject(objects);
            await File.WriteAllTextAsync(path , text) ;
        }
    }
}