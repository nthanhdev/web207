namespace BemmEduApi.Controllers
{

    using Microsoft.AspNetCore.Mvc;
    using BemmEduApi.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Threading;
    using System;
    using System.Linq;

    [ApiController]
    [Route("[controller]")]
    public class ExamController : Controller
    {
        private readonly DbcontextFile context;

        public ExamController(DbcontextFile context)
        {
            this.context = context;
        }

        [HttpGet]
        public IActionResult Exam(string Id)
        {
            var ListQuiz = context.GetQuizzes(Id);

            return Ok(ListQuiz);
        }

        [HttpPost, DisableRequestSizeLimit]

        public  async Task<JsonResult>  submitSubject(List<Quiz> subjects , string Name , string  username ) {


                int correct = 0 ;
                int incorrect = 0 ;
                foreach(var item in subjects) { 

                    if(item.AnswerId == item.answer) correct++ ;
                    else{
                        incorrect++;
                    }

                }

                double  mark = Math.Round(correct * ((double)10 / subjects.Count),1);
                var histories = getHistories();

                ResultQuiz resultQuizzes = new ResultQuiz();
                resultQuizzes.Id = System.Guid.NewGuid();
                resultQuizzes.correct = correct;
                resultQuizzes.incorrect = incorrect ; 
                resultQuizzes.Mark = mark;
                resultQuizzes.quiz = subjects;
                resultQuizzes.Message = mark <5 ? "Không đạt" : "Đạt";
                resultQuizzes.Time = System.DateTime.Now;
                resultQuizzes.Name = Name;
                resultQuizzes.username = username;
                histories.Add(resultQuizzes);
                Console.WriteLine(username);

                 await context.SaveDataDbAsync<ResultQuiz>(histories) ;

                return Json( new {message = "Đã nộp bài thành công" , Id = resultQuizzes.Id});


        }
    

        [HttpGet("History")]
        public IActionResult GetHistory(Guid id){

            var list = getHistories();
            var History = list.SingleOrDefault(x=> x.Id == id);
           
            return Ok(History);
        }

        
        [HttpGet("GetHistorybyUser")]
        public IActionResult GetHistorybyUser(string username){

            var list = getHistories();
            var History = list.Select(x=> x).Where(x=> x.username == username);
            return Ok(History);
        }

        [HttpGet("GetHistorys")]
        public IActionResult GetHistorys(){

            var list = from x in getHistories() select new {

                    name = x.Name,
                    time = x.Time,
                    username = x.username,
                    mark = x.Mark
            };
          
            return Ok(list);
        }

        private List<ResultQuiz> getHistories()
        {

            var list = context.GetDataDb<ResultQuiz>();
            return list;
        }


    }
}