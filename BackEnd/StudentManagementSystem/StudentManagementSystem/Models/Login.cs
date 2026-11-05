using System.ComponentModel.DataAnnotations.Schema;

namespace StudentManagementSystem.Models
{
    [NotMapped]
    public class Login
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}