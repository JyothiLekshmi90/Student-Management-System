using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Data;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("GetTeachers")]
        public async Task<ActionResult<IEnumerable<Register>>> GetTeachers()
        {
            if (_context.Registers == null)
            {
                return NotFound();
            }
            return await _context.Registers.Where(x=>x.Role==1).ToListAsync();
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
    }
}
