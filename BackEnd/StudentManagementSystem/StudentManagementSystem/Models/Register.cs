using System.ComponentModel.DataAnnotations;

namespace StudentManagementSystem.Models
{
    public class Register
    {
        [Key]
        public int Id { get; set; }
        public int Role {  get; set; }
        public string? Name { get; set; }
        public string? Class {  get; set; }
        public string? Division {  get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
