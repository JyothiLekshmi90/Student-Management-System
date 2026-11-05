using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Data;
using StudentManagementSystem.Models;
using System.Collections.Immutable;

namespace StudentManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public TeacherController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("GetStudents")]
        public async Task<ActionResult<IEnumerable<Register>>> GetStudents()
        {
            if (_context.Registers == null)
            {
                return NotFound();
            }
            return await _context.Registers.Where(x => x.Role == 2).ToListAsync();
        }
        [HttpGet("GetProfileByEmail")]
        public async Task<ActionResult<Register>> GetProfileByEmail([FromQuery] string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest(new { message = "Email parameter is required." });
            }

            // Query your DB table using the email passed from the frontend
            var currentTeacher = await _context.Registers
                .FirstOrDefaultAsync(x => x.Email == email && x.Role == 1);

            if (currentTeacher == null)
            {
                return NotFound(new { message = "Teacher profile record not found." });
            }

            return currentTeacher;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Register>> GetByTeacherId(int id)
        {
            if (_context.Registers == null)
            {
                return NotFound();
            }
            var d = await _context.Registers.FindAsync(id);
            if (d == null)
            {
                return NotFound();
            }
            return d;
        }
        [HttpPut("UpdateProfile/{id}")]
        public async Task<ActionResult> UpdateProfile(int id, Register r)
        {
            if (id != r.Id)
            {
                return BadRequest();
            }
            _context.Registers.Update(r);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPost]
        [Route("Addmarks")]
        public async Task<ActionResult<Mark>> Addmarks([FromBody] Mark mark)
        {
            _context.Marks.Add(mark);
            await _context.SaveChangesAsync();
            return mark;
        }
        [HttpGet("GetStudentsByDivision/{teacherId}")]
        public async Task<ActionResult<IEnumerable<Register>>> GetStudentsByDivision(int teacherId)
        {
            var teacher=await _context.Registers
                .FirstOrDefaultAsync(u=>u.Id==teacherId && u.Role==1);
            if (teacher == null) return NotFound("teacher not found");


            var students=await _context.Registers
                .Where(s=>s.Role==2
                && s.Class==teacher.Class
                && s.Division==teacher.Division).ToListAsync();
            return Ok(students);
        }
        [HttpGet("GetMarklist/{id}")]
        public async Task<ActionResult<Mark>> GetMarklist(int id)
        {
            var students = from student in _context.Registers
                           join mark in _context.Marks on student.Id equals mark.Student_Id
                           where student.Id == id
                           select new
                           {
                               StudentName = student.Name,
                               StudentId = student.Id,
                               Class=student.Class,
                               Division=student.Division,
                               English=mark.English,
                               Hindi=mark.Hindi,
                               Malayalam=mark.Malayalam,
                               Maths=mark.Maths,
                               History=mark.History,
                               Geography=mark.Geography,
                               Physics=mark.Physics,
                               Chemistry=mark.Chemistry,
                               Biology=mark.Biology,
                               Computer=mark.Computer
                           };
            return Ok(students);
        }
        [HttpGet("GetStudent/{id}")]
        public async Task<ActionResult<Register>> GetStudent(int id)
        {
            if (_context.Registers == null)
            {
                return NotFound();
            }
            var d = await _context.Registers.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (d == null)
            {
                return NotFound();
            }
            return d;
        }
        [HttpGet("Getmark/{id}")]
        public async Task<ActionResult<Mark>> Getmark(int id)
        {
            if (_context.Marks == null)
            {
                return NotFound();
            }
            var d = await _context.Marks.Where(x=>x.Student_Id==id).FirstOrDefaultAsync();
            if (d == null)
            {
                return NotFound();
            }
            return d;
        }
        [HttpPut("Updatemark")]
        public async Task<ActionResult> Updatemark(Mark m)
        {
            var d = await _context.Marks.FindAsync(m.Mark_Id);
            if (d == null)
            {
                return NotFound($"Mark record not found.");
            }

            // 3. Map values from incoming model 'm' straight into tracked instance 'd'
            d.English = m.English;
            d.Hindi = m.Hindi;
            d.Malayalam = m.Malayalam;
            d.Maths = m.Maths;
            d.History = m.History;
            d.Geography = m.Geography;
            d.Physics = m.Physics;
            d.Chemistry = m.Chemistry;
            d.Biology = m.Biology;
            d.Computer = m.Computer;
            d.Student_Id = m.Student_Id; // Keep your foreign key intact

            // 4. Save changes directly. EF Core automatically detects changes in 'd'
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpPost]
        [Route("AddAttendance")]
        public async Task<ActionResult<Attendance>> AddAttendance([FromBody] Attendance Att)
        {
            // 1. Guard check to ensure valid payload data
            if (Att == null)
            {
                return BadRequest("Attendance payload data cannot be null.");
            }

            if (Att.PresentDays > Att.TotalDays)
            {
                return BadRequest("Present days cannot be greater than total working days.");
            }

            // 2. Server-side validation math recalculation override for safety
            Att.AbsentDays = Att.TotalDays - Att.PresentDays;

            // 3. Queue insertion tracking in entity framework
            _context.Attendances.Add(Att);

            // 4. Commit transaction directly to the database
            await _context.SaveChangesAsync();

            // 5. Return REST-compliant success status envelope with data object
            return Ok(Att);
        }
        [HttpGet("GetAttendance/{id}")]
        public async Task<ActionResult<Attendance>> GetAttendance(int id)
        {
            if (_context.Attendances == null)
            {
                return NotFound();
            }
            var d = await _context.Attendances.Where(x => x.Student_Id == id).FirstOrDefaultAsync();
            if (d == null)
            {
                return NotFound();
            }
            return d;
        }
        [HttpPost]
        [Route("Addassignment")]
        public async Task<ActionResult<Assignment>> Addassignment([FromBody] Assignment assi)
        {
            _context.Assignments.Add(assi);
            await _context.SaveChangesAsync();
            return assi;
        }
        [HttpGet]
        [Route("GetAssignment/{id}")]
        public async Task<ActionResult<IEnumerable<Assignment>>> GetAssignment(int id)
        {
            if (_context.Assignments == null)
            {
                return NotFound();
            }
            var d = await _context.Assignments.Where(x => x.TeacherId == id).ToListAsync();
            if (d == null)
            {
                return NotFound();
            }
            return d;
        }
    }
}
