namespace BemmEduApi.Controllers
{

    using Microsoft.AspNetCore.Mvc;
    using BemmEduApi.Models;
    using System.Collections.Generic;

    [ApiController]
    [Route("[controller]")]
    public class SubjectController : Controller
    {
        private readonly DbcontextFile context;

        public SubjectController(DbcontextFile context)
        {
            this.context = context;
        }

        private List<Subject> GetSubjects(){

            List<Subject> subjects = context.GetDataDb<Subject>();
            return subjects;
        }

        [HttpGet]

        public IActionResult GetData() {

            return Ok(GetSubjects());
        }
    }
}