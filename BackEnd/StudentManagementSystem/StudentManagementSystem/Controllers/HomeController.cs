using Microsoft.AspNetCore.Cors; // Make sure this is present
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentManagementSystem.Data;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    [Route("api/[controller]")] // This establishes base route as /api/Home
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("addroles")]
        public async Task<ActionResult<Role>> Addroles([FromBody] Role role)
        {
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
            return role;
        }

        [HttpPost]
        [Route("AddDetails")] // 👈 This maps the endpoint path explicitly to: /api/Home/AddDetails
        public IActionResult AddDetails([FromBody] Register reg) // 👈 Added [FromBody] for React JSON compatibility
        {
            if (reg == null)
            {
                return BadRequest("Invalid registration data.");
            }

            try
            {
                // Explicitly targeting the DbSet is much safer than _context.Add(reg)
                _context.Registers.Add(reg); // Replace 'Registers' with your actual matching DbSet name in ApplicationDbContext
                _context.SaveChanges();
                return Ok(reg);
            }
            catch (Exception ex)
            {
                // This captures and prints database migration/validation problems in your backend terminal
                Console.WriteLine($"Database Save Error: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Stack Trace: {ex.InnerException.Message}");
                }
                return StatusCode(500, $"Internal DB Error: {ex.Message}");
            }
        }
        [HttpPost]
        [Route("Log")]
        // 1. Added [FromBody] so it accepts Axios JSON payloads
        public IActionResult Login([FromBody] Login login)
        {
            if (login == null) return BadRequest("Invalid payload format.");

            // 2. Looks up the registering records
            var user = _context.Registers.FirstOrDefault(u => u.Email == login.Username && u.Password == login.Password);

            if (user != null)
            {
                // 3. FIXED LOGIC: Must return Ok 200 containing data so React knows it passed!
                return Ok(new
                {
                    message = "successfully logged in",
                    email = user.Email,
                    id=user.Id,
                    // Maps your database role mapping back to a readable string format
                    role = user.Role == 0 ? "Admin" : (user.Role == 1 ? "Teacher" : "Student")
                });
            }

            // 4. If search results returned null, reject the client request
            return Unauthorized(new { message = "Invalid email address or password combination." });
        }



    }
}
