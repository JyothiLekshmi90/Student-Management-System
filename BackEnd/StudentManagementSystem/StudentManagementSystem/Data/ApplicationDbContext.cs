using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using StudentManagementSystem.Data;

using StudentManagementSystem.Models;

namespace StudentManagementSystem.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {        
        }
        public DbSet<Register> Registers { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Mark> Marks { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
    }
}
