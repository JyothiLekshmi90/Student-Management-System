using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Data;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public StudentController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("GetProfileByEmail")]
        public async Task<ActionResult<Register>> GetProfileByEmail([FromQuery] string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest(new { message = "Email parameter is required." });
            }

            // Query your DB table using the email passed from the frontend
            var currentStudent = await _context.Registers
                .FirstOrDefaultAsync(x => x.Email == email && x.Role == 2);

            if (currentStudent == null)
            {
                return NotFound(new { message = "Teacher profile record not found." });
            }

            return currentStudent;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Register>> GetByStudentId(int id)
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
        [HttpPut("UpdatestudentProfile/{id}")]
        public async Task<ActionResult> UpdatestudentProfile(int id, Register r)
        {
            if (id != r.Id)
            {
                return BadRequest();
            }
            _context.Registers.Update(r);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpGet("GetMarklist/{id}")]
        public async Task<ActionResult<Mark>> GetMarklist(int id)
        {
            if (_context.Marks == null)
            {
                return NotFound();
            }
            var d = await _context.Marks.FindAsync(id);
            if (d == null)
            {
                return NotFound();
            }
            return d;
        }
        [HttpGet]
        [Route("GetAssignment/{id}")]
        public async Task<ActionResult<IEnumerable<Assignment>>> GetAssignment(int id)
        {
            if (_context.Assignments == null || _context.Registers == null)
            {
                return NotFound();
            }

            // 1. Find the student record using the provided ID
            var student = await _context.Registers.FirstOrDefaultAsync(x => x.Id == id);
            if (student == null)
            {
                return NotFound("Student not found.");
            }

            // 2. Fetch assignments where the teacher's class/division matches the student's class/division
            var assignmentList = await (from assignment in _context.Assignments
                                        join teacher in _context.Registers on assignment.TeacherId equals teacher.Id
                                        where teacher.Class == student.Class && teacher.Division == student.Division
                                        select assignment).ToListAsync();

            return Ok(assignmentList);
        }

    }
}
