namespace BemmEduApi.Controllers
{

    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("[controller]")]
    public class ExamController : Controller
    {
        private readonly DbcontextFile context ;

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


    }
}