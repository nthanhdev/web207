namespace BemmEduApi.Controllers
{

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Http;
    using BemmEduApi.Models;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.AspNetCore.Cors;

    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : Controller
    {
        private readonly DbcontextFile dbcontextFile;

        public StudentController(DbcontextFile dbcontextFile)
        {
            this.dbcontextFile = dbcontextFile;
        }

        private List<Student> getStudents()
        {

            List<Student> students = dbcontextFile.GetDataDb<Student>();
            return students;
        }
        [HttpGet]

        public IActionResult GetAll()
        {

            try
            {

                List<Student> students = getStudents();
                return Ok(students);
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpPost("login")]
        public IActionResult Login(StudentAccount account)
        {

            try
            {
                var student = getStudents().SingleOrDefault(x => x.username == account.username && x.password == account.password);

                if (student == null) return Ok(new { message = "Tên đăng nhập hoặc mật khẩu không đúng !", success = false });


                return Ok(new { message = "Đăng nhập thành công", success = true, infoUser = student });
            }
            catch
            {
                return BadRequest();
            }

        }

        [HttpPut]

        public async Task<IActionResult> Edit(Student _student)
        {
            var ListStudents = getStudents();
            var student = ListStudents.SingleOrDefault(x => x.username == _student.username);
            if (student == null) return NotFound(new { message = "Không tìm thấy user" });
            student.birthday = _student.birthday;
            student.fullname = _student.fullname;
            student.email = _student.email;
            student.gender = _student.gender;
            student.marks = _student.marks;
            student.schoolfee = _student.schoolfee;
            student.password = _student.password;
            await dbcontextFile.SaveDataDbAsync<Student>(ListStudents);
            return Ok(new { message = "Chỉnh sửa thành công", infoUser = student });
        }
    }
}